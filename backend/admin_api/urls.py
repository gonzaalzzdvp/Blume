from rest_framework.routers import DefaultRouter

from admin_api.views.category import (
    AdminCategoryViewSet,
)

from admin_api.views.products import (
    AdminProductViewSet,
)

from admin_api.views.orders import (
    AdminOrderViewSet,
)

router = DefaultRouter()

router.register(
    "products",
    AdminProductViewSet,
    basename="admin-products",
)

router.register(
    "categories",
    AdminCategoryViewSet,
    basename="admin-categories",
)

router.register(
    "orders",
    AdminOrderViewSet,
    basename="admin-orders",
)

urlpatterns = router.urls