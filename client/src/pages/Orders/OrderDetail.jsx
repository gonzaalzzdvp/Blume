import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMyOrder } from "../../services/orderService";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      const data = await getMyOrder(id);

      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!order) {
    return <main className="mt-22 p-8">Cargando...</main>;
  }

  return (
    <main className="mt-22 max-w-5xl mx-auto p-6">
      <h1 className="mb-8 text-4xl text-(--pinkRose) font-bold">{order.order_number}</h1>
      <div className="border border-(--grayBlume) rounded-2xl shadow-md p-6 mb-6">
        <h2 className="mb-4 text-xl text-(--orangeBlume) font-semibold">Información</h2>
        <p>
          <strong>Cliente:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Documento:</strong> {order.customer_document}
        </p>
        <p>
          <strong>Teléfono:</strong> {order.customer_phone}
        </p>
        <p>
          <strong>Método de pago:</strong> {order.payment_method}
        </p>
        <p>
          <strong>Método de envío:</strong> {order.shipping_method}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
      </div>
      <div className="p-6 border border-(--grayBlume) rounded-2xl shadow-md">
        <h2 className="text-xl text-(--orangeBlume) font-semibold mb-4">Productos</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-(--grayBlume) pb-3"
            >
              <div>
                <p className="font-medium">{item.product_title}</p>
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div>${item.subtotal}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
