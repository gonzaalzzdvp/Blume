from django.conf import settings
from django.db import models

from products.models import Product


class Order(models.Model):

    PAYMENT_METHODS = [
        ("usdt", "USDT"),
        ("zelle", "Zelle"),
        ("zinli", "Zinli"),
        ("paypal", "PayPal"),
        ("transfer", "Transferencia"),
        ("pago_movil", "Pago Móvil"),
        ("cash", "Efectivo"),
    ]

    SHIPPING_METHODS = [
        ("pickup", "Pick-up"),
        ("delivery", "Delivery"),
        ("agency", "Agencia"),
    ]

    DELIVERY_ZONES = [

        ("propatria", "Propatria"),
        ("perez_bonalde", "Pérez Bonalde"),
        ("plaza_sucre", "Plaza Sucre"),
        ("gato_negro", "Gato Negro"),
        ("agua_salud", "Agua Salud"),
        ("capitolio", "Capitolio"),
        ("la_hoyada", "La Hoyada"),
        ("parque_central", "Parque Central"),
        ("nuevo_circo", "Nuevo Circo"),
        ("teatros", "Teatros"),
        ("plaza_venezuela", "Plaza Venezuela"),
        ("sabana_grande", "Sabana Grande"),
        ("chacaito", "Chacaíto"),
        ("chacao", "Chacao"),
        ("altamira", "Altamira"),
        ("miranda", "Miranda"),
        ("los_dos_caminos", "Los Dos Caminos"),
        ("los_cortijos", "Los Cortijos"),
        ("la_california", "La California"),
        ("petare", "Petare"),

        ("bello_monte", "Bello Monte"),
        ("zona_rental", "Zona Rental"),
        ("parque_central", "Parque Central"),
        ("nuevo_circo", "Nuevo Circo"),
        ("teatros", "Teatros"),
        ("el_silencio", "El Silencio"),
        ("capuchinos", "Capuchinos"),
        ("maternidad", "Maternidad"),
        ("artigas", "Artigas"),
        ("la_paz", "La Paz"),
        ("la_yaguara", "La Yaguara"),
        ("carapita", "Carapita"),
        ("antimano", "Antímano"),
        ("mamera", "Mamera"),
        ("caricuao", "Caricuao"),
        ("zoologico", "Zoológico"),
        ("ruiz_pineda", "Ruiz Pineda"),
        ("las_adjuntas", "Las Adjuntas"),
        
        ("ciudad_universitaria", "Ciudad Universitaria"),
        ("los_simbolos", "Los Simbolos"),
        ("la_bandera", "La Bandera"),
        ("el_valle", "El Valle"),
        ("los_jardines", "Los Jardines"),
        ("coche", "Coche"),
        ("mercado", "Mercado"),
        ("la_rinconada", "La Rinconada"),

        
        ("los_teques", "Los Teques"),
    ]

    AGENCY_CHOICES = [
        ("mrw", "MRW"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pendiente"),
        ("confirmed", "Confirmada"),
        ("completed", "Completada"),
        ("cancelled", "Cancelada"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
        null=True,
        blank=True,
    )

    order_number = models.CharField(
        max_length=30,
        unique=True,
    )

    customer_name = models.CharField(
        max_length=255,
    )

    customer_phone = models.CharField(
        max_length=30,
    )

    customer_document = models.CharField(
        max_length=30,
    )

    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHODS,
    )

    shipping_method = models.CharField(
        max_length=30,
        choices=SHIPPING_METHODS,
    )

    delivery_zone = models.CharField(
        max_length=50,
        choices=DELIVERY_ZONES,
        blank=True,
    )

    agency_name = models.CharField(
        max_length=20,
        choices=AGENCY_CHOICES,
        blank=True,
    )

    agency_address = models.CharField(
        max_length=255,
        blank=True,
    )

    notes = models.TextField(
        blank=True,
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):

        if not self.order_number:

            last_order = Order.objects.order_by(
                "-id"
            ).first()

            next_id = 1

            if last_order:
                next_id = last_order.id + 1

            self.order_number = (
                f"BLM-{next_id:06d}"
            )

        super().save(*args, **kwargs)

    class Meta:

        ordering = ["-created_at"]

    def __str__(self):

        return self.order_number
    
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
    )

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    def save(self, *args, **kwargs):

        self.subtotal = (
            self.quantity * self.unit_price
        )

        super().save(*args, **kwargs)