import { useMemo, useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

import UploadButton from "./UploadButton";
import ImageGrid from "./ImageGrid";

export default function ImageUploader({
  existingImages,
  setExistingImages,

  newImages,
  setNewImages,

  deletedImages,
  setDeletedImages,

  imageOrder,
  setImageOrder,
}) {
  /*
  |--------------------------------------------------------------------------
  | Crear estructura visual
  |--------------------------------------------------------------------------
  */

  const normalizedExistingImages = useMemo(() => {
    return existingImages.map((img) => ({
      id: `existing:${img.id}`,
      backendId: img.id,
      preview: img.image,
      image: img.image,
      type: "existing",
      file: null,
    }));
  }, [existingImages]);

  const normalizedNewImages = useMemo(() => {
    return newImages.map((item) => {
      // Compatibilidad con el formato anterior:
      // si todavía llega un File directamente.
      if (item instanceof File) {
        return {
          id: item._imageId || `new:${crypto.randomUUID()}`,
          backendId: null,
          preview: URL.createObjectURL(item),
          file: item,
          type: "new",
        };
      }

      return {
        id: `new:${item.id}`,
        backendId: null,
        preview: item.preview,
        file: item.file,
        type: "new",
      };
    });
  }, [newImages]);

  /*
  |--------------------------------------------------------------------------
  | Lista visual
  |--------------------------------------------------------------------------
  */

  const allImages = useMemo(() => {
    const map = new Map();

    normalizedExistingImages.forEach((image) => {
      map.set(image.id, image);
    });

    normalizedNewImages.forEach((image) => {
      map.set(image.id, image);
    });

    /*
    |---------------------------------------------
    | Si tenemos un orden guardado localmente,
    | respetarlo.
    |---------------------------------------------
    */

    if (imageOrder?.length) {
      const ordered = [];

      imageOrder.forEach((id) => {
        const image = map.get(id);

        if (image) {
          ordered.push(image);
          map.delete(id);
        }
      });

      /*
      |---------------------------------------------
      | Agregar cualquier imagen que todavía
      | no esté en imageOrder.
      |---------------------------------------------
      */

      map.forEach((image) => {
        ordered.push(image);
      });

      return ordered;
    }

    return [...normalizedExistingImages, ...normalizedNewImages];
  }, [normalizedExistingImages, normalizedNewImages, imageOrder]);

  /*
  |--------------------------------------------------------------------------
  | Agregar imágenes
  |--------------------------------------------------------------------------
  */

  function handleSelect(files) {
    const newItems = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...newItems]);

    setImageOrder((prev) => [
      ...prev,
      ...newItems.map((item) => `new:${item.id}`),
    ]);
  }

  /*
  |--------------------------------------------------------------------------
  | Eliminar
  |--------------------------------------------------------------------------
  */

  function handleDelete(image) {
    if (image.type === "existing") {
      setDeletedImages((prev) =>
        prev.includes(image.backendId) ? prev : [...prev, image.backendId],
      );

      setExistingImages((prev) =>
        prev.filter((img) => img.id !== image.backendId),
      );

      setImageOrder((prev) => prev.filter((id) => id !== image.id));

      return;
    }

    setNewImages((prev) =>
      prev.filter((item) => item.id !== image.id.replace("new:", "")),
    );

    setImageOrder((prev) => prev.filter((id) => id !== image.id));

    URL.revokeObjectURL(image.preview);
  }

  /*
  |--------------------------------------------------------------------------
  | Drag & Drop
  |--------------------------------------------------------------------------
  */

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = allImages.findIndex((image) => image.id === active.id);

    const newIndex = allImages.findIndex((image) => image.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reordered = arrayMove(allImages, oldIndex, newIndex);

    /*
     * El orden visual completo.
     *
     * Ejemplo:
     *
     * existing:4
     * new:abc
     * existing:2
     * existing:8
     */

    setImageOrder(reordered.map((image) => image.id));
  }

  /*
  |--------------------------------------------------------------------------
  | Mantener imageOrder sincronizado
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!imageOrder?.length) {
      return;
    }

    const validIds = new Set(allImages.map((image) => image.id));

    const cleanedOrder = imageOrder.filter((id) => validIds.has(id));

    if (cleanedOrder.length !== imageOrder.length) {
      setImageOrder(cleanedOrder);
    }
  }, [allImages]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Imágenes del producto</h2>

        <p className="text-gray-500 mt-2">
          Arrastra las imágenes para cambiar el orden. La primera será la imagen
          principal.
        </p>
      </div>

      <UploadButton onSelect={handleSelect} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ImageGrid images={allImages} onDelete={handleDelete} />
      </DndContext>

      <div className="text-sm text-gray-500">
        {allImages.length} imagen
        {allImages.length !== 1 && "es"}
      </div>
    </div>
  );
}
