from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import (
    OrderingFilter,
    SearchFilter,
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from products.models import Product

from admin_api.serializers.product import (
    AdminProductSerializer,
)

from users.permissions import IsAdmin


class AdminProductViewSet(ModelViewSet):

    queryset = Product.objects.all()

    serializer_class = AdminProductSerializer

    permission_classes = [IsAdmin]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "title",
        "description",
    ]

    filterset_fields = [
        "category",
        "is_active",
    ]

    ordering_fields = [
        "price",
        "stock",
        "created_at",
    ]

    ordering = [
        "-created_at",
    ]