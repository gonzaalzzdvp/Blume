import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ImageUploader({ images, setImages }) {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (!files.length) return;

    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div
        onClick={() => inputRef.current.click()}
        className="
          border-2
          border-dashed
          border-gray-300
          rounded-2xl
          h-56
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          hover:border-(--pinkRose)
          hover:bg-pink-50
          transition
        "
      >
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className="text-4xl text-(--pinkRose)"
        />

        <p className="mt-5 font-semibold">Haz click para subir imágenes</p>

        <p className="text-sm text-gray-500 mt-2">
          Puedes seleccionar varias imágenes.
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <>
          <h3 className="font-semibold">Vista previa</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="
                    h-36
                    w-full
                    object-cover
                    rounded-xl
                    shadow
                  "
                />

                {index === 0 && (
                  <span
                    className="
                      absolute
                      top-2
                      left-2
                      bg-(--pinkRose)
                      text-white
                      text-xs
                      px-2
                      py-1
                      rounded-full
                    "
                  >
                    Principal
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="
                    absolute
                    top-2
                    right-2
                    w-8
                    h-8
                    rounded-full
                    bg-red-500
                    text-white
                    opacity-0
                    group-hover:opacity-100
                    transition
                    cursor-pointer
                  "
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
