import { useEffect, useState } from "react";

import {
  getCategories,
  deleteCategory,
} from "../../services/adminCategoryService";

import CategoryRow from "../../components/Category/CategoryRow";

import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch {
      toast.error(
        "No fue posible cargar categorías"
      );
    }
  }

  async function handleDelete(category) {
    const confirmed = window.confirm(
      `¿Eliminar ${category.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteCategory(category.id);

      toast.success(
        "Categoría eliminada"
      );

      loadCategories();
    } catch {
      toast.error(
        "No se pudo eliminar"
      );
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Categorías
        </h1>

        <a
          href="/admin/categories/new"
          className="
            px-5
            py-3
            rounded-xl
            bg-(--pinkRose)
            text-white
          "
        >
          Nueva categoría
        </a>
      </div>

      <div className="bg-white rounded-2xl shadow">

        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onDelete={handleDelete}
          />
        ))}

      </div>

    </div>
  );
}