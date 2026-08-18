import json

from django.db import transaction
from django.utils.text import slugify

from rest_framework import serializers

import cloudinary.utils

from products.models import Product, ProductImage
from products.serializers import ProductImageSerializer


def parse_json_list(value, default=None):
    """
    Convierte una lista recibida como JSON desde multipart/form-data
    en una lista de Python.

    Ejemplo:

        '["34", "35"]'
        ->
        ["34", "35"]
    """

    if default is None:
        default = []

    if value is None:
        return default

    if isinstance(value, list):
        return value

    if isinstance(value, str):

        try:
            parsed = json.loads(value)

        except (json.JSONDecodeError, TypeError):
            return default

        if isinstance(parsed, list):
            return parsed

    return default


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

    gallery_image_keys = serializers.CharField(
        write_only=True,
        required=False,
    )

    deleted_images = serializers.CharField(
        write_only=True,
        required=False,
    )

    image_order = serializers.CharField(
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
        keys=None,
    ):
        """
        Crea las ProductImage.

        Las posiciones iniciales son temporales.
        El orden definitivo se aplica posteriormente
        mediante image_order.
        """

        created = []

        keys = keys or []

        for index, image in enumerate(images):

            item = ProductImage.objects.create(
                product=product,
                image=image,
                position=start_position + index,
            )

            created.append(
                {
                    "item": item,
                    "key": (
                        keys[index]
                        if index < len(keys)
                        else None
                    ),
                }
            )

        return created

    def normalize_positions(self, product):
        """
        Garantiza que las posiciones finales sean:

        1, 2, 3, 4...

        sin huecos.
        """

        images = list(
            ProductImage.objects
            .filter(product=product)
            .order_by("position", "id")
        )

        for index, image in enumerate(
            images,
            start=1,
        ):

            if image.position != index:

                ProductImage.objects.filter(
                    id=image.id
                ).update(
                    position=index
                )

    def apply_image_order(
        self,
        product,
        image_order,
        new_images_map=None,
    ):
        """
        Aplica el orden enviado por React.

        Ejemplo:

        [
            "new:abc",
            "existing:34",
            "new:def",
            "existing:35"
        ]

        Resultado:

        position 1 -> nueva abc
        position 2 -> existing 34
        position 3 -> nueva def
        position 4 -> existing 35
        """

        if not image_order:
            return

        new_images_map = new_images_map or {}

        # -------------------------------------------------
        # POSICIONES TEMPORALES
        # -------------------------------------------------
        #
        # position es PositiveIntegerField.
        #
        # NO podemos utilizar -1, -2, etc.
        #
        # Usamos valores altos para liberar las posiciones
        # antes de asignar 1, 2, 3...
        #

        existing_images = list(
            ProductImage.objects
            .filter(product=product)
            .order_by("id")
        )

        for index, image in enumerate(
            existing_images,
            start=1,
        ):

            ProductImage.objects.filter(
                id=image.id
            ).update(
                position=1000000 + index
            )

        # -------------------------------------------------
        # APLICAR ORDEN DEFINITIVO
        # -------------------------------------------------

        position = 1

        ordered_image_ids = set()

        for token in image_order:

            if not isinstance(token, str):
                continue

            # -------------------------------------------------
            # IMAGEN EXISTENTE
            # -------------------------------------------------

            if token.startswith("existing:"):

                try:

                    image_id = int(
                        token.replace(
                            "existing:",
                            "",
                        )
                    )

                except ValueError:

                    continue

                image = (
                    ProductImage.objects
                    .filter(
                        product=product,
                        id=image_id,
                    )
                    .first()
                )

                if not image:
                    continue

                image.position = position

                image.save(
                    update_fields=[
                        "position"
                    ]
                )

                ordered_image_ids.add(
                    image.id
                )

                position += 1

            # -------------------------------------------------
            # IMAGEN NUEVA
            # -------------------------------------------------

            elif token.startswith("new:"):

                key = token.replace(
                    "new:",
                    "",
                )

                image = new_images_map.get(
                    key
                )

                if not image:
                    continue

                image.position = position

                image.save(
                    update_fields=[
                        "position"
                    ]
                )

                ordered_image_ids.add(
                    image.id
                )

                position += 1

        # -------------------------------------------------
        # IMÁGENES NO INCLUIDAS EN image_order
        # -------------------------------------------------
        #
        # Por seguridad, cualquier ProductImage que no
        # haya aparecido en image_order se coloca al final.
        #
        # Normalmente no debería ocurrir porque React envía
        # todas las imágenes activas.
        #

        remaining_images = (
            ProductImage.objects
            .filter(product=product)
            .exclude(
                id__in=ordered_image_ids
            )
            .order_by("position", "id")
        )

        for image in remaining_images:

            image.position = position

            image.save(
                update_fields=[
                    "position"
                ]
            )

            position += 1

    def update_main_image(self, product):
        """
        Product.image siempre representa la primera
        ProductImage según position.

        Si no quedan imágenes, Product.image queda vacío.
        """

        first_image = (
            ProductImage.objects
            .filter(product=product)
            .order_by("position", "id")
            .first()
        )

        if first_image:

            product.image = first_image.image

        else:

            product.image = None

        product.save(
            update_fields=[
                "image"
            ]
        )

    #################################################
    # CREATE
    #################################################

    @transaction.atomic
    def create(
        self,
        validated_data,
    ):

        gallery_images = validated_data.pop(
            "gallery_images",
            []
        )

        gallery_image_keys_raw = (
            validated_data.pop(
                "gallery_image_keys",
                "[]",
            )
        )

        image_order_raw = (
            validated_data.pop(
                "image_order",
                "[]",
            )
        )

        gallery_image_keys = parse_json_list(
            gallery_image_keys_raw
        )

        image_order = parse_json_list(
            image_order_raw
        )

        # -------------------------------------------------
        # SLUG
        # -------------------------------------------------

        validated_data["slug"] = (
            self.generate_unique_slug(
                validated_data["title"]
            )
        )

        # -------------------------------------------------
        # PRODUCTO
        # -------------------------------------------------

        product = Product.objects.create(
            **validated_data
        )

        # -------------------------------------------------
        # GALERÍA
        # -------------------------------------------------

        created_images = self.create_gallery(
            product,
            gallery_images,
            start_position=1000000,
            keys=gallery_image_keys,
        )

        new_images_map = {
            item["key"]: item["item"]
            for item in created_images
            if item["key"]
        }

        # -------------------------------------------------
        # ORDEN
        # -------------------------------------------------

        if not image_order:

            image_order = [
                f"new:{item['key']}"
                for item in created_images
                if item["key"]
            ]

        self.apply_image_order(
            product,
            image_order,
            new_images_map,
        )

        # -------------------------------------------------
        # NORMALIZAR
        # -------------------------------------------------

        self.normalize_positions(
            product
        )

        # -------------------------------------------------
        # PORTADA
        # -------------------------------------------------

        self.update_main_image(
            product
        )

        return product

    #################################################
    # UPDATE
    #################################################

    @transaction.atomic
    def update(
        self,
        instance,
        validated_data,
    ):

        gallery_images = validated_data.pop(
            "gallery_images",
            []
        )

        gallery_image_keys_raw = (
            validated_data.pop(
                "gallery_image_keys",
                "[]",
            )
        )

        deleted_images_raw = (
            validated_data.pop(
                "deleted_images",
                "[]",
            )
        )

        image_order_raw = (
            validated_data.pop(
                "image_order",
                "[]",
            )
        )

        # -------------------------------------------------
        # PORTADA MANUAL
        # -------------------------------------------------
        #
        # La dejamos compatible con tu API actual.
        # Sin embargo, el flujo del ImageUploader no
        # debería utilizarla.
        #

        new_image = validated_data.pop(
            "image",
            None,
        )

        gallery_image_keys = parse_json_list(
            gallery_image_keys_raw
        )

        deleted_images = parse_json_list(
            deleted_images_raw
        )

        image_order = parse_json_list(
            image_order_raw
        )

        old_title = instance.title

        # -------------------------------------------------
        # CAMPOS DEL PRODUCTO
        # -------------------------------------------------

        for attr, value in validated_data.items():

            setattr(
                instance,
                attr,
                value
            )

        # -------------------------------------------------
        # SLUG
        # -------------------------------------------------

        if old_title != instance.title:

            instance.slug = (
                self.generate_unique_slug(
                    instance.title
                )
            )

        # -------------------------------------------------
        # PORTADA MANUAL
        # -------------------------------------------------

        if new_image:

            instance.image = new_image

        instance.save()

        # -------------------------------------------------
        # ELIMINAR IMÁGENES
        # -------------------------------------------------

        deleted_ids = []

        for image_id in deleted_images:

            try:

                deleted_ids.append(
                    int(image_id)
                )

            except (
                TypeError,
                ValueError,
            ):

                continue

        if deleted_ids:

            ProductImage.objects.filter(
                product=instance,
                id__in=deleted_ids,
            ).delete()

        # -------------------------------------------------
        # CREAR NUEVAS IMÁGENES
        # -------------------------------------------------

        created_images = self.create_gallery(
            instance,
            gallery_images,
            start_position=1000000,
            keys=gallery_image_keys,
        )

        new_images_map = {
            item["key"]: item["item"]
            for item in created_images
            if item["key"]
        }

        # -------------------------------------------------
        # ORDEN
        # -------------------------------------------------

        if image_order:

            self.apply_image_order(
                instance,
                image_order,
                new_images_map,
            )

        # -------------------------------------------------
        # NORMALIZAR
        # -------------------------------------------------

        self.normalize_positions(
            instance
        )

        # -------------------------------------------------
        # PORTADA
        # -------------------------------------------------

        self.update_main_image(
            instance
        )

        return instance