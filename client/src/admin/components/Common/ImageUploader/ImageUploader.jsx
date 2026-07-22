import { useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

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
  | Construcción de la lista visual
  |--------------------------------------------------------------------------
  */

  const allImages = [
    ...existingImages.map((img) => ({
      id: img.id,
      preview: img.image,
      type: "existing",
      isMain: img.isMain,
    })),

    ...newImages.map((file, index) => ({
      id: `new-${index}`,
      preview: URL.createObjectURL(file),
      file,
      type: "new",
    })),
  ];

  /*
  |--------------------------------------------------------------------------
  | Agregar imágenes
  |--------------------------------------------------------------------------
  */

  function handleSelect(files) {
    setNewImages((prev) => [...prev, ...files]);
  }

  /*
  |--------------------------------------------------------------------------
  | Eliminar imágenes
  |--------------------------------------------------------------------------
  */

  function handleDelete(image) {
    if (image.type === "existing") {
      setDeletedImages((prev) =>
        prev.includes(image.id) ? prev : [...prev, image.id],
      );

      setExistingImages((prev) => prev.filter((img) => img.id !== image.id));

      return;
    }

    setNewImages((prev) => prev.filter((file) => file !== image.file));
  }

  /*
  |--------------------------------------------------------------------------
  | Drag & Drop
  |--------------------------------------------------------------------------
  */

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = allImages.findIndex((img) => img.id === active.id);

    const newIndex = allImages.findIndex((img) => img.id === over.id);

    const reordered = arrayMove(allImages, oldIndex, newIndex);

    const existing = reordered
      .filter((img) => img.type === "existing")
      .map((img, index) => ({
        id: img.id,
        image: img.image,
        isMain: index === 0,
      }));

    const fresh = reordered
      .filter((img) => img.type === "new")
      .map((img) => img.file);

    setExistingImages(existing);
    setNewImages(fresh);

    const orderedIds = reordered
      .filter((img) => img.type === "existing")
      .map((img) => img.id);

    setImageOrder(orderedIds);
  }

  useEffect(() => {
    if (!setImageOrder) return;

    const ids = existingImages.map((image) => image.id);

    setImageOrder(ids);
  }, [existingImages, setImageOrder]);

  return (
    <div className="space-y-8">
      {/* CABECERA */}

      <div>
        <h2 className="text-xl font-semibold">Imágenes del producto</h2>

        <p className="text-gray-500 mt-2">
          Arrastra las imágenes para cambiar el orden. La primera será la imagen
          principal.
        </p>
      </div>

      {/* BOTÓN */}

      <UploadButton onSelect={handleSelect} />

      {/* GRID */}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={allImages.map((img) => img.id)}
          strategy={rectSortingStrategy}
        >
          <ImageGrid images={allImages} onDelete={handleDelete} />
        </SortableContext>
      </DndContext>

      {/* FOOTER */}

      <div className="text-sm text-gray-500">
        {allImages.length} imagen
        {allImages.length !== 1 && "es"}
      </div>
    </div>
  );
}
