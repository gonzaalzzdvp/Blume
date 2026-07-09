from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import CartItem
from .serializers import CartSerializer

class CartView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = CartSerializer(request.user.cart)

        return Response(serializer.data)
    
class AddToCartView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        product_id = request.data.get("product_id")

        try:
            quantity = int(request.data.get("quantity", 1))
        except (TypeError, ValueError):
            return Response(
                {"detail": "Cantidad inválida."},
                status=status.HTTP_400_BAD_REQUEST,
    )

        product = get_object_or_404(
            Product,
            pk=product_id,
            is_active=True,
        )

        cart = request.user.cart

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                "quantity": quantity
            }
        )

        if not created:

            cart_item.quantity += quantity

        if cart_item.quantity > product.stock:

            return Response(
                {
                    "detail": "No hay suficiente stock."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart_item.save()

        serializer = CartSerializer(cart)

        return Response(serializer.data)
    
class CartItemView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        cart_item = get_object_or_404(
            CartItem,
            pk=pk,
            cart=request.user.cart,
        )

        quantity = int(request.data.get("quantity"))

        if quantity < 1:

            return Response(
                {
                    "detail": "Cantidad inválida."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if quantity > cart_item.product.stock:

            return Response(
                {
                    "detail": "Stock insuficiente."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart_item.quantity = quantity

        cart_item.save()

        serializer = CartSerializer(request.user.cart)

        return Response(serializer.data)
    
    def delete(self, request, pk):

        cart_item = get_object_or_404(
            CartItem,
            pk=pk,
            cart=request.user.cart,
        )

        cart_item.delete()

        serializer = CartSerializer(request.user.cart)

        return Response(serializer.data)
    
class ClearCartView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request):

        request.user.cart.items.all().delete()

        serializer = CartSerializer(request.user.cart)

        return Response(serializer.data)