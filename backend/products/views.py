from rest_framework import generics
from .models import Product, Category
from .serializers import (
    ProductSerializer,
    CategorySerializer
)
from rest_framework.filters import SearchFilter
from rest_framework import generics


class CategoryListView(generics.ListAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):

    serializer_class = ProductSerializer

    filter_backends = [SearchFilter]

    search_fields = [
        "title",
        "description",
        "brand",
    ]

    def get_queryset(self):

        queryset = Product.objects.filter(
            is_active=True
        )

        category = self.request.query_params.get("category")

        if category == "featured":
            queryset = queryset.filter(featured=True)

        elif category:
            queryset = queryset.filter(
                category__slug=category
            )

        return queryset

class ProductDetailView(generics.RetrieveAPIView):

    serializer_class = ProductSerializer

    queryset = Product.objects.filter(
        is_active=True
    ).select_related(
        "category"
    ).prefetch_related(
        "images"
    )

    lookup_field = "slug"

class FeaturedProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(
            featured=True,
            is_active=True,
        ).order_by("-created_at")[:5]