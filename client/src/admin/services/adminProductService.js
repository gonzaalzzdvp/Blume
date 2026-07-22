import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Productos
|--------------------------------------------------------------------------
*/

export const getProducts = async (params = {}) => {
  const response = await api.get("/admin/products/", {
    params,
  });

  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/admin/products/${id}/`);

  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post("/admin/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await api.put(`/admin/products/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/admin/products/${id}/`);
};

/*
|-------------------------------------------------
| Categorías
|-------------------------------------------------
*/

export async function getCategories() {
  const response = await api.get("/products/categories/");

  return response.data;
}
