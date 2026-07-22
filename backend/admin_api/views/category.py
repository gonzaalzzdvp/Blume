from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from products.models import Category

from admin_api.serializers.category import (
    AdminCategorySerializer,
)


class AdminCategoryViewSet(viewsets.ModelViewSet):

    serializer_class = AdminCategorySerializer

    permission_classes = [
        IsAdminUser,
    ]

    queryset = Category.objects.all().order_by("name")