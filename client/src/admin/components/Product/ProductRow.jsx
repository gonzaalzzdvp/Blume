import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <div
      className="
        grid
        grid-cols-[90px_2fr_1.5fr_120px_100px_110px_120px]
        items-center
        gap-4
        px-6
        py-4
        border-b
        border-gray-200
        hover:bg-gray-50
      "
    >
      <img
        src={product.image_url}
        alt={product.title}
        className="w-16 h-16 object-cover rounded-lg"
      />

      <p className="font-medium">{product.title}</p>

      <p>{product.category_name}</p>

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
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(product)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
