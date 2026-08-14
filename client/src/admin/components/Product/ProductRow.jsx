import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProductRow({ product, onDelete }) {
  return (
    <div
      className="
        border-b
        border-gray-200
        last:border-b-0
        hover:bg-gray-50
      "
    >
      {/* ============================= */}
      {/* MOBILE */}
      {/* ============================= */}

      <div className="lg:hidden p-4">
        {/* PRODUCT INFO */}
        <div className="flex items-start gap-4">
          <img
            src={product.image_url}
            alt={product.title}
            className="
              w-20
              h-20
              shrink-0
              object-cover
              rounded-xl
            "
          />

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base break-words">
              {product.title}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {product.category_name}
            </p>

            <span
              className={`
                inline-flex
                mt-3
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                ${
                  product.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {product.is_active ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <p className="text-xs text-gray-500">Precio</p>

            <p className="mt-1 font-semibold">${product.price}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Stock</p>

            <p className="mt-1 font-semibold">{product.stock}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="
              flex
              justify-center
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              border
              border-gray-200
              text-gray-700
              hover:bg-gray-100
            "
          >
            <FontAwesomeIcon icon={faPen} />
            <span>Editar</span>
          </Link>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="
              flex
              justify-center
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              border
              border-red-200
              text-red-600
              hover:bg-red-50
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Eliminar</span>
          </button>
        </div>
      </div>

      {/* ============================= */}
      {/* TABLET / DESKTOP */}
      {/* ============================= */}

      <div
        className="
          hidden
          md:grid
          grid-cols-[90px_2fr_1.5fr_120px_100px_110px_120px]
          items-center
          gap-4
          px-6
          py-4
        "
      >
        <img
          src={product.image_url}
          alt={product.title}
          className="
            w-16
            h-16
            object-cover
            rounded-lg
          "
        />

        <p className="font-medium truncate">{product.title}</p>

        <p className="truncate">{product.category_name}</p>

        <p>${product.price}</p>

        <p>{product.stock}</p>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            text-center
            ${
              product.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {product.is_active ? "Activo" : "Inactivo"}
        </span>

        <div className="flex gap-3">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="
              text-red-600
              hover:text-red-800
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="
              text-blue-600
              hover:text-blue-800
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
