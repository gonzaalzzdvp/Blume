from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
    
class Product(models.Model):

    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)

    description = models.TextField()

    brand = models.CharField(max_length=100, blank=True)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    size = models.CharField(max_length=50)

    stock = models.PositiveIntegerField(default=0)

    hair_type = models.CharField(
        max_length=100,
        blank=True
    )

    benefit = models.CharField(
        blank=True
    )

    ingredients = models.TextField(blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    image = CloudinaryField("image")

    featured = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
class ProductImage(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = CloudinaryField("image")

    alt_text = models.CharField(
        max_length=255,
        blank=True
    )

    position = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["position"]

    def __str__(self):
        return f"{self.product.title}"