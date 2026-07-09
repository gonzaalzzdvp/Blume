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

export const createProduct = async (product) => {
  const response = await api.post("/admin/products/", buildFormData(product), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(
    `/admin/products/${id}/`,
    buildFormData(product),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/admin/products/${id}/`);
};

const buildFormData = (product) => {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  return formData;
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
