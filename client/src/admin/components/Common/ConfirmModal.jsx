import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function ConfirmModal({
  open,
  title = "Confirmar acción",
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
          overflow-hidden
        "
      >
        <div className="p-8">

          <div
            className="
              w-16
              h-16
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
              mx-auto
              mb-6
            "
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-red-600 text-2xl"
            />
          </div>

          <h2 className="text-2xl font-bold text-center">
            {title}
          </h2>

          <p className="text-center text-gray-500 mt-4">
            {message}
          </p>

        </div>

        <div
          className="
            border-t
            px-6
            py-5
            flex
            justify-end
            gap-4
          "
        >
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              cursor-pointer
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-red-600
              text-white
              hover:bg-red-700
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading
              ? "Eliminando..."
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}