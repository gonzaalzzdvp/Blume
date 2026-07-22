import api from "../../services/api";

export const getOrders = async () => {
  const response = await api.get(
    "/admin/orders/"
  );

  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(
    `/admin/orders/${id}/`
  );

  return response.data;
};

export const updateOrderStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/admin/orders/${id}/`,
    {
      status,
    }
  );

  return response.data;
};