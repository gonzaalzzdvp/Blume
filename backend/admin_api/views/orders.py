from rest_framework import viewsets

from orders.models import Order

from admin_api.serializers.order import (
    AdminOrderSerializer,
)

from users.permissions import IsAdmin


class AdminOrderViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Order.objects
        .prefetch_related(
            "items",
            "items__product",
        )
    )

    serializer_class = (
        AdminOrderSerializer
    )

    permission_classes = [
        IsAdmin,
    ]

    http_method_names = [
        "get",
        "patch",
        "head",
        "options",
    ]