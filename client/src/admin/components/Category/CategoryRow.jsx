import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CategoryRow({
  category,
  onDelete,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-6
        py-5
        border-b
        border-gray-200
      "
    >
      <div>
        <p className="font-medium">
          {category.name}
        </p>

        <p className="text-sm text-gray-500">
          {category.slug}
        </p>
      </div>

      <div className="flex gap-4">

        <Link
          to={`/admin/categories/${category.id}/edit`}
          className="text-blue-600"
        >
          <FontAwesomeIcon icon={faPen} />
        </Link>

        <button
          type="button"
          onClick={() =>
            onDelete(category)
          }
          className="text-red-600 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

      </div>
    </div>
  );
}