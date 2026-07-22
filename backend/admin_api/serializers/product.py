from django.utils.text import slugify

from rest_framework import serializers

import cloudinary.utils

from products.models import Product, ProductImage
from products.serializers import ProductImageSerializer


class AdminProductSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    images = ProductImageSerializer(
        many=True,
        read_only=True,
    )

    gallery_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
    )

    deleted_images = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
    )

    image_order = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Product

        fields = "__all__"

        read_only_fields = [
            "slug",
        ]

        extra_kwargs = {
            "image": {
                "required": False,
            }
        }

    #################################################
    # READ
    #################################################

    def get_image_url(self, obj):

        if not obj.image:
            return None

        return cloudinary.utils.cloudinary_url(
            obj.image.public_id,
            secure=True,
        )[0]

    #################################################
    # HELPERS
    #################################################

    def generate_unique_slug(self, title):

        slug = slugify(title)

        unique_slug = slug

        counter = 1

        while Product.objects.filter(
            slug=unique_slug
        ).exists():

            unique_slug = f"{slug}-{counter}"

            counter += 1

        return unique_slug

    def create_gallery(
        self,
        product,
        images,
        start_position=1,
    ):

        created = []

        for index, image in enumerate(
            images,
            start=start_position,
        ):

            item = ProductImage.objects.create(
                product=product,
                image=image,
                position=index,
            )

            created.append(item)

        return created

    def apply_image_order(
        self,
        product,
        image_order,
    ):

        if not image_order:
            return

        for position, image_id in enumerate(
            image_order,
            start=1,
        ):

            ProductImage.objects.filter(
                id=image_id,
                product=product,
            ).update(
                position=position,
            )

    def update_main_image(
        self,
        product,
    ):

        first_image = product.images.order_by(
            "position"
        ).first()

        if first_image:

            product.image = first_image.image

        elif product.images.count() == 0:

            product.image = None

        product.save(
            update_fields=["image"]
        )

    #################################################
    # CREATE
    #################################################

    def create(self, validated_data):

        gallery_images = validated_data.pop(
            "gallery_images",
            []
        )

        validated_data.pop(
            "deleted_images",
            None,
        )

        validated_data.pop(
            "image_order",
            None,
        )

        validated_data["slug"] = (
            self.generate_unique_slug(
                validated_data["title"]
            )
        )

        product = Product.objects.create(
            **validated_data
        )

        self.create_gallery(
            product,
            gallery_images,
            start_position=1,
        )

        self.update_main_image(
            product
        )

        return product

    #################################################
    # UPDATE
    #################################################

    def update(
        self,
        instance,
        validated_data,
    ):

        gallery_images = validated_data.pop(
            "gallery_images",
            []
        )

        deleted_images = validated_data.pop(
            "deleted_images",
            []
        )

        image_order = validated_data.pop(
            "image_order",
            []
        )

        new_image = validated_data.pop(
            "image",
            None,
        )

        old_title = instance.title

        #################################################
        # CAMPOS
        #################################################

        for attr, value in validated_data.items():

            setattr(
                instance,
                attr,
                value,
            )

        #################################################
        # SLUG
        #################################################

        if old_title != instance.title:

            instance.slug = (
                self.generate_unique_slug(
                    instance.title
                )
            )

        #################################################
        # PORTADA MANUAL
        #################################################

        if new_image:

            instance.image = new_image

        instance.save()

        #################################################
        # ELIMINAR IMÁGENES
        #################################################

        if deleted_images:

            ProductImage.objects.filter(
                product=instance,
                id__in=deleted_images,
            ).delete()

        #################################################
        # AGREGAR NUEVAS
        #################################################

        last_image = (
            ProductImage.objects.filter(
                product=instance
            )
            .order_by("-position")
            .first()
        )

        next_position = (
            last_image.position + 1
            if last_image
            else 1
        )

        self.create_gallery(
            instance,
            gallery_images,
            start_position=next_position,
        )

        #################################################
        # REORDENAR
        #################################################

        self.apply_image_order(
            instance,
            image_order,
        )

        #################################################
        # ACTUALIZAR PORTADA
        #################################################

        self.update_main_image(
            instance
        )

        return instance