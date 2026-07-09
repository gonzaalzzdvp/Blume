from django.contrib import admin
from .models import Product, ProductImage, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        "slug": ("name",)
    }

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    inlines = [ProductImageInline]

    list_display = (
        "title",
        "price",
        "stock",
        "category",
        "featured",
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }