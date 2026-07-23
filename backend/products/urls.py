from django.urls import path

from .views import (
    ProductListView,
    ProductDetailView,
    CategoryListView,
    FeaturedProductsView
)

urlpatterns = [

    path(
        "categories/",
        CategoryListView.as_view(),
        name="categories"
    ),

    path(
        "",
        ProductListView.as_view(),
        name="products"
    ),

    path(
        "featured/",
        FeaturedProductsView.as_view(),
        name="featured-products",
    ),

    path(
        "<slug:slug>/",
        ProductDetailView.as_view(),
        name="product-detail"
    ),
]

