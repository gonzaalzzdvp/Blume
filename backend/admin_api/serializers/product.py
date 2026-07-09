from django.utils.text import slugify
import cloudinary.uploader
from rest_framework import serializers
from products.models import Product


class AdminProductSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(
        required=False,
        allow_null=True,
    )

    slug = serializers.CharField(
        required=False,
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )


    class Meta:
        model = Product

        fields = "__all__"

    def create(self, validated_data):

        image = validated_data.pop("image", None)

        if not validated_data.get("slug"):

            validated_data["slug"] = slugify(
                validated_data["title"]
            )

        product = Product.objects.create(**validated_data)

        if image:

            upload = cloudinary.uploader.upload(
                image,
                folder="blume/products",
            )

            product.image = upload["public_id"]

            product.save()

        return product

    def update(self, instance, validated_data):

        image = validated_data.pop("image", None)

        if (
            "title" in validated_data
            and not validated_data.get("slug")
        ):

            validated_data["slug"] = slugify(
                validated_data["title"]
            )

        for attr, value in validated_data.items():

            setattr(instance, attr, value)

        if image:

            upload = cloudinary.uploader.upload(
                image,
                folder="blume/products",
            )

            instance.image = upload["public_id"]

        instance.save()

        return instance