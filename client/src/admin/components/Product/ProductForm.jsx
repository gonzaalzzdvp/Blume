import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BRANDS, SIZES, HAIR_LINES } from "../../constants/productOptions";
import ImageUploader from "../Common/ImageUploader/ImageUploader";

export default function ProductForm({
  initialData = {},
  categories = [],
  loading = false,
  onSubmit,
  onCancel,

  existingImages,
  setExistingImages,
  
  newImages,
  setNewImages,

  deletedImages,
  setDeletedImages,

  imageOrder,
  setImageOrder,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      title: initialData.title || "",
      description: initialData.description || "",
      brand: initialData.brand || "",
      size: initialData.size || "",
      price: initialData.price || "",
      stock: initialData.stock || "",
      hair_type: initialData.hair_type || "",
      benefit: initialData.benefit || "",
      ingredients: initialData.ingredients || "",
      category: initialData.category || "",
      featured: initialData.featured || false,
      is_active:
        initialData.is_active !== undefined ? initialData.is_active : true,
    });
  }, [initialData, reset]);

  return (
    <form
      className="grid lg:grid-cols-3 gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* INFORMACIÓN GENERAL */}

      <div className="bg-white lg:col-span-2 space-y-8 rounded-2xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Información General</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nombre</label>

            <input
              {...register("title", {
                required: "Ingrese un nombre",
              })}
              className="w-full border rounded-xl p-3"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Descripción</label>

            <textarea
              rows={5}
              {...register("description")}
              className="w-full border rounded-xl p-3 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Marca</label>

              <select
                {...register("brand")}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Seleccione una Marca</option>
                {BRANDS.map((BRANDS) => (
                  <option key={BRANDS} value={BRANDS}>
                    {BRANDS}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Categoría</label>

              <select
                {...register("category", {
                  required: "Seleccione una categoría",
                })}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Seleccione una Categoría</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Tamaño</label>

              <select
                {...register("size")}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Seleccione un Tamaño</option>
                {SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Precio</label>

              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Ingrese el precio",
                })}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Stock</label>

              <input
                type="number"
                {...register("stock", {
                  required: "Ingrese el stock",
                })}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Tipo de cabello</label>

              <select
                {...register("hair_type")}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Seleccione un Tipo de Cabello</option>
                {HAIR_LINES.map((HAIR_LINES) => (
                  <option key={HAIR_LINES} value={HAIR_LINES}>
                    {HAIR_LINES}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-8">
        {/* BENEFICIOS */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-6">Beneficios</h2>

          <textarea
            rows={5}
            {...register("benefit")}
            placeholder="Describe los beneficios..."
            className="w-full border rounded-xl p-3 resize-none"
          />
        </div>

        {/* INGREDIENTES */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Ingredientes</h2>

          <textarea
            rows={5}
            {...register("ingredients")}
            placeholder="Lista de ingredientes..."
            className="w-full border rounded-xl p-3 resize-none"
          />
        </div>

        {/* ESTADO */}
        <div>
          <h2 className="font-semibold text-lg mb-5">Estado</h2>

          <div className="space-y-5">
            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("is_active")} />

              <span>Producto activo</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("featured")} />

              <span>Producto destacado</span>
            </label>
          </div>
        </div>
      </div>

      {/* IMAGENES */}
      <div className="bg-white col-start-1 col-end-3 space-y-8 rounded-2xl shadow p-8">
        <ImageUploader
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          newImages={newImages}
          setNewImages={setNewImages}
          imageOrder={imageOrder}
          setImageOrder={setImageOrder}
        />
      </div>

      {/* BOTONES */}

      <div className="flex justify-end items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="
            h-20
            px-6
            py-3
            rounded-xl
            border
            cursor-pointer
          "
        >
          Cancelar
        </button>

        <button
          disabled={loading}
          className="
            bg-(--pinkRose)
            h-20
            px-8
            py-3
            text-white
            rounded-xl
            hover:opacity-90
            disabled:opacity-50
            cursor-pointer
          "
        >
          {loading ? "Guardando..." : "Guardar producto"}
        </button>
      </div>
    </form>
  );
}
