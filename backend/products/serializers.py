from rest_framework import serializers
from .models import Category, Product, ProductImage
import cloudinary.utils

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage

        fields = [
            "id",
            "image",
            "alt_text",
            "position",
        ]

    def get_image(self, obj):

        if not obj.image:
            return None

        return cloudinary.utils.cloudinary_url(
            obj.image.public_id,
            secure=True,
        )[0]
    
class ProductSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    category_slug = serializers.CharField(
        source="category.slug",
        read_only=True
    )

    class Meta:
        model = Product

        fields = "__all__"

    def get_image_url(self, obj):

        if not obj.image:
            return None

        return cloudinary.utils.cloudinary_url(
            obj.image.public_id,
            secure=True,
        )[0]
        