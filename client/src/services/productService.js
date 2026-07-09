import api from "./api";

export const getProducts = async (
  search = "",
  category = null
) => {

  const params = {};

  if (search) {
    params.search = search;
  }

  if (category) {
    params.category = category;
  }

  const response = await api.get(
    "/products/",
    {
      params,
    }
  );

  return response.data;
};

export const getProduct = async (slug) => {

  const response = await api.get(
    `/products/${slug}/`
  );

  return response.data;
};

export const getCategories = async () => {

  const response = await api.get(
    "/products/categories/"
  );

  return response.data;
};