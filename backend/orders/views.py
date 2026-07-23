from rest_framework import generics

from .models import Order
from .serializers import OrderSerializer, OrderListSerializer, OrderDetailSerializer
from rest_framework.permissions import IsAuthenticated


class OrderCreateView(
    generics.CreateAPIView
):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer

class MyOrdersView(generics.ListAPIView):

    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        )

# orders/views.py

class MyOrderDetailView(
    generics.RetrieveAPIView
):

    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        )