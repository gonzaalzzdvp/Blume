from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter
from products.models import Product
from admin_api.serializers.product import AdminProductSerializer
from users.permissions import IsAdmin
from rest_framework.parsers import MultiPartParser, FormParser


class AdminProductListCreateView(generics.ListCreateAPIView):

    queryset = Product.objects.all()

    serializer_class = AdminProductSerializer

    permission_classes = [IsAdmin]

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

    parser_classes = [
    MultiPartParser,
    FormParser,
]

class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Product.objects.all()

    serializer_class = AdminProductSerializer

    permission_classes = [IsAdmin]

    parser_classes = [
    MultiPartParser,
    FormParser,
]
