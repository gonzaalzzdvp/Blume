import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableImageCard from "./SortableImageCard";

export default function ImageGrid({
  images,
  onDelete,
}) {
  if (!images.length) {
    return (
      <div
        className="
          h-64
          border-2
          border-dashed
          rounded-2xl
          flex
          flex-col
          justify-center
          items-center
          text-gray-400
          bg-gray-50
        "
      >
        <p className="text-lg font-medium">
          No hay imágenes
        </p>

        <p className="text-sm mt-2">
          Agrega imágenes para comenzar.
        </p>
      </div>
    );
  }

  return (
    <SortableContext
      items={images.map((image) => image.id)}
      strategy={rectSortingStrategy}
    >
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
      >
        {images.map((image, index) => (
          <SortableImageCard
            key={image.id}
            image={image}
            index={index}
            onDelete={() => onDelete(image)}
          />
        ))}
      </div>
    </SortableContext>
  );
}