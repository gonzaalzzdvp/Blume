import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faStar,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function ImageCard({ image, index, onDelete }) {
  const isMain = index === 0;

  const imageSrc = image.type === "existing" ? image.image : image.preview;

  return (
    <div
      className="
        relative
        rounded-2xl
        overflow-hidden
        bg-white
        border
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-200
      "
    >
      {/* Imagen */}

      <img
        src={image.preview}
        alt={`Producto ${index + 1}`}
        className="
          w-full
          h-52
          object-cover
          select-none
          pointer-events-none
        "
      />

      {/* Principal */}

      {isMain && (
        <div
          className="
            absolute
            top-3
            left-3
            flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            bg-yellow-400
            text-white
            text-xs
            font-semibold
            shadow
          "
        >
          <FontAwesomeIcon icon={faStar} />
          Principal
        </div>
      )}

      {/* Nueva */}

      {image.type === "new" && (
        <div
          className="
            absolute
            bottom-3
            left-3
            px-3
            py-1
            rounded-full
            bg-green-500
            text-white
            text-xs
            font-medium
          "
        >
          Nueva
        </div>
      )}

      {/* Drag */}

      <div
        className="
          absolute
          top-3
          right-14
          w-9
          h-9
          rounded-full
          bg-white/90
          backdrop-blur
          shadow
          flex
          items-center
          justify-center
          text-gray-500
          cursor-grab
        "
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </div>

      {/* Eliminar */}

      <button
        type="button"
        onClick={onDelete}
        className="
          absolute
          top-3
          right-3
          w-9
          h-9
          rounded-full
          bg-white
          shadow
          text-red-600
          hover:bg-red-50
          transition
          cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Footer */}

      <div
        className="
          px-4
          py-3
          border-t
          bg-gray-50
          text-sm
          text-gray-500
          flex
          justify-between
          items-center
        "
      >
        <span>Imagen {index + 1}</span>

        {isMain && (
          <span className="font-semibold text-(--pinkRose)">Portada</span>
        )}
      </div>
    </div>
  );
}
