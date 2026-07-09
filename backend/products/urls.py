from django.urls import path

from .views import (
    ProductListView,
    ProductDetailView,
    CategoryListView
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
        "<slug:slug>/",
        ProductDetailView.as_view(),
        name="product-detail"
    ),
]

