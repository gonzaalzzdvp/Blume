from django.urls import path

from .views import OrderCreateView, MyOrdersView, MyOrderDetailView

urlpatterns = [

    path(
        "",
        OrderCreateView.as_view(),
        name="create-order",
    ),

    path(
        "my/",
        MyOrdersView.as_view(),
    ),

    # orders/urls.py

    path(
        "my/<int:pk>/",
        MyOrderDetailView.as_view(),
    ),
]