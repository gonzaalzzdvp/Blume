from django.urls import path

from .views.products import (
    AdminProductListCreateView,
    AdminProductDetailView,
)

urlpatterns = [

    path(
        "products/",
        AdminProductListCreateView.as_view(),
        name="admin-products",
    ),

    path(
        "products/<int:pk>/",
        AdminProductDetailView.as_view(),
        name="admin-product-detail",
    ),
]