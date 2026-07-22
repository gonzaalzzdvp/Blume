import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ImageCard from "./ImageCard";

export default function SortableImageCard({
  image,
  index,
  onDelete,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        touch-none
        ${isDragging ? "scale-105" : ""}
      `}
    >
      <div
        {...attributes}
        {...listeners}
      >
        <ImageCard
          image={image}
          index={index}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}