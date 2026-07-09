from rest_framework import serializers
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):

    product_id = serializers.IntegerField(
        source="product.id",
        read_only=True
    )

    title = serializers.CharField(
        source="product.title",
        read_only=True
    )

    price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    image = serializers.SerializerMethodField()

    stock = serializers.IntegerField(
        source="product.stock",
        read_only=True
    )

    class Meta:
        model = CartItem

        fields = (
            "id",
            "product_id",
            "title",
            "price",
            "image",
            "stock",
            "quantity",
        )

    def get_image(self, obj):
        if obj.product.image:
            return obj.product.image.url
        return None
    
class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    total = serializers.SerializerMethodField()

    total_items = serializers.SerializerMethodField()

    class Meta:

        model = Cart

        fields = (
            "id",
            "items",
            "total",
            "total_items",
        )

    def get_total(self, obj):

        total = 0

        for item in obj.items.all():

            total += item.product.price * item.quantity

        return total

    def get_total_items(self, obj):

        return sum(
            item.quantity
            for item in obj.items.all()
        )