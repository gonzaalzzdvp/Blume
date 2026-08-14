import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../../services/adminCategoryService";

import CategoryRow from "../../components/Category/CategoryRow";

import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("No fue posible cargar categorías");
    }
  }

  async function handleDelete(category) {
    const confirmed = window.confirm(`¿Eliminar ${category.name}?`);

    if (!confirmed) return;

    try {
      await deleteCategory(category.id);
      toast.success("Categoría eliminada");
      loadCategories();
    } catch {
      toast.error("No se pudo eliminar");
    }
  }

  return (
    <div className="w-full space-y-6 md:space-y-8 px-4 sm:px-6 md:px-0 py-4 md:py-0 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Categorías</h1>

        <Link
          to="/admin/categories/new"
          className="
            w-full
            md:w-auto
            text-center
            px-5
            py-3
            rounded-xl
            bg-(--pinkRose)
            text-white
            font-medium
            hover:opacity-90
            transition-opacity
            cursor-pointer
          "
        >
          Nueva categoría
        </Link>
      </div>

      {/* Contenedor de lista/tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 md:p-10 text-center text-gray-500">
            No hay categorías registradas.
          </div>
        ) : (
          categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
