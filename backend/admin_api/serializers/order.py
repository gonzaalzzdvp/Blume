from rest_framework import serializers

from orders.models import Order, OrderItem


class AdminOrderItemSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source="product.title",
        read_only=True,
    )

    class Meta:

        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "unit_price",
            "subtotal",
        ]


class AdminOrderSerializer(
    serializers.ModelSerializer
):

    items = AdminOrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:

        model = Order

        fields = "__all__"

        read_only_fields = [
            "order_number",
            "customer_name",
            "customer_phone",
            "customer_document",
            "payment_method",
            "shipping_method",
            "delivery_zone",
            "agency_name",
            "agency_address",
            "subtotal",
            "total",
            "created_at",
            "updated_at",
        ]