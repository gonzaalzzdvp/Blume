import { useEffect, useState } from "react";

import {
  createCategory,
  updateCategory,
  getCategory,
} from "../../services/adminCategoryService";

import CategoryForm from "../../components/Category/CategoryForm";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

export default function CategoryFormPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const editing = Boolean(id);

  const [loading, setLoading] =
    useState(false);

  const [category, setCategory] =
    useState({});

  useEffect(() => {
    if (editing) {
      loadCategory();
    }
  }, []);

  async function loadCategory() {
    try {
      const data =
        await getCategory(id);

      setCategory(data);
    } catch {
      toast.error(
        "No se pudo cargar"
      );
    }
  }

  async function handleSubmit(data) {
    try {
      setLoading(true);

      if (editing) {
        await updateCategory(
          id,
          data
        );

        toast.success(
          "Categoría actualizada"
        );
      } else {
        await createCategory(data);

        toast.success(
          "Categoría creada"
        );
      }

      navigate(
        "/admin/categories"
      );
    } catch {
      toast.error(
        "No fue posible guardar"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <CategoryForm
      initialData={category}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}