import api from "./api";

export async function createOrder(orderData) {
  const response = await api.post("/orders/", orderData);

  return response.data;
}

export async function getMyOrders() {
  const { data } = await api.get("/orders/my/");

  return data;
}

export async function getMyOrder(id) {
  const { data } = await api.get(`/orders/my/${id}/`);

  return data;
}

export async function getOrderChoices() {
  const { data } = await api.get("/orders/choices/");
  return data;
}
