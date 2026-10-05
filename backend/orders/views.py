from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

import logging

from .email_service import send_order_received_email

from .models import Order

from .serializers import (
    OrderSerializer,
    OrderListSerializer,
    OrderDetailSerializer,
)


logger = logging.getLogger(__name__)


class OrderCreateView(generics.CreateAPIView):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        order = serializer.save()

        try:

            send_order_received_email(order)

        except Exception:

            logger.exception(
                "Error inesperado al enviar correo del pedido %s",
                order.order_number,
            )

        response_serializer = self.get_serializer(
            order
        )

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
        )

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

class OrderChoicesView(APIView):
    permission_classes = []

    def get(self, request):
        return Response({
            "payment_methods": [
                {"value": value, "label": label}
                for value, label in Order.PAYMENT_METHODS
            ],
            "shipping_methods": [
                {"value": value, "label": label}
                for value, label in Order.SHIPPING_METHODS
            ],
            "delivery_zones": [
                {"value": value, "label": label}
                for value, label in Order.DELIVERY_ZONES
            ],
            "agencies": [
                {"value": value, "label": label}
                for value, label in Order.AGENCY_CHOICES
            ],
        })