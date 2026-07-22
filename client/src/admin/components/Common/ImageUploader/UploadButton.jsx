import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function UploadButton({ onSelect }) {
  const inputRef = useRef(null);

  function handleFiles(files) {
    if (!files || files.length === 0) return;

    onSelect(Array.from(files));

    // Permite volver a seleccionar el mismo archivo
    inputRef.current.value = "";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="
          flex
          items-center
          gap-3
          px-6
          py-3
          rounded-xl
          border-2
          border-dashed
          border-(--pinkRose)
          text-(--pinkRose)
          hover:bg-pink-50
          transition
          cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faPlus} />

        <span>Agregar imágenes</span>
      </button>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );
}