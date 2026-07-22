from django.utils.text import slugify

from rest_framework import serializers

from products.models import Category


class AdminCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category

        fields = "__all__"

        read_only_fields = [
            "slug",
        ]

    #################################################
    # HELPERS
    #################################################

    def generate_unique_slug(self, name):

        slug = slugify(name)

        unique_slug = slug

        counter = 1

        while Category.objects.filter(
            slug=unique_slug
        ).exists():

            unique_slug = f"{slug}-{counter}"

            counter += 1

        return unique_slug

    #################################################
    # CREATE
    #################################################

    def create(self, validated_data):

        validated_data["slug"] = self.generate_unique_slug(
            validated_data["name"]
        )

        return Category.objects.create(
            **validated_data
        )

    #################################################
    # UPDATE
    #################################################

    def update(self, instance, validated_data):

        old_name = instance.name

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if old_name != instance.name:

            instance.slug = self.generate_unique_slug(
                instance.name
            )

        instance.save()

        return instance