from rest_framework import serializers

from .models import Order, OrderItem

from products.models import Product


class OrderItemCreateSerializer(
    serializers.Serializer
):

    product_id = serializers.IntegerField()

    quantity = serializers.IntegerField(
        min_value=1
    )


class OrderSerializer(
    serializers.ModelSerializer
):

    items = OrderItemCreateSerializer(
        many=True,
        write_only=True,
    )

    class Meta:

        model = Order

        fields = "__all__"

        read_only_fields = [
        "order_number",
        "subtotal",
        "total",
        "status",
        "created_at",
    ]

    def validate(self, attrs):

        shipping_method = attrs.get(
            "shipping_method"
        )

        delivery_zone = attrs.get(
            "delivery_zone"
        )

        agency_name = attrs.get(
            "agency_name"
        )

        agency_address = attrs.get(
            "agency_address"
        )

        if shipping_method == "delivery":

            if not delivery_zone:

                raise serializers.ValidationError({
                    "delivery_zone":
                    "Seleccione una estación."
                })

        if shipping_method == "agency":

            if not agency_name:

                raise serializers.ValidationError({
                    "agency_name":
                    "Seleccione una agencia."
                })

            if not agency_address:

                raise serializers.ValidationError({
                    "agency_address":
                    "Indique la sucursal."
                })

        return attrs

    def create(self, validated_data):

        items = validated_data.pop(
            "items"
        )

        order = Order.objects.create(
            user=self.context["request"].user,
            **validated_data
        )

        subtotal = 0

        for item in items:

            product = Product.objects.get(
                id=item["product_id"]
            )

            quantity = item["quantity"]

            price = product.price

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                unit_price=price,
            )

            subtotal += (
                price * quantity
            )

        order.subtotal = subtotal
        order.total = subtotal

        order.save()

        return order

class OrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "total",
            "status",
            "created_at",
        ]

# orders/serializers.py

class OrderItemDetailSerializer(
    serializers.ModelSerializer
):

    product_title = serializers.CharField(
        source="product.title",
        read_only=True,
    )

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product_title",
            "quantity",
            "unit_price",
            "subtotal",
        ]

class OrderDetailSerializer(
    serializers.ModelSerializer
):

    items = OrderItemDetailSerializer(
        many=True,
        read_only=True,
    )

    class Meta:

        model = Order

        fields = "__all__"