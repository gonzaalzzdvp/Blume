import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getOrder, updateOrderStatus } from "../../services/adminOrderService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch (error) {
      console.error(error);
      toast.error("No fue posible cargar la orden");
    }
  }
  async function handleStatusChange(e) {
    const status = e.target.value;
    try {
      const updated = await updateOrderStatus(order.id, status);
      setOrder(updated);

      toast.success("Estado actualizado");
    } catch (error) {
      console.error(error);

      toast.error("No fue posible actualizar la orden");
    }
  }

  if (!order) {
    return <main className="p-8">Cargando...</main>;
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">{order.order_number}</h1>
          <p className="text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="px-4 py-2 hover:bg-(--pinkRose) shadow-sm border border-(--grayBlume) rounded-xl">
          Volver
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* CLIENTE */}
        <div className="shadow-md border border-(--grayBlume) rounded-2xl p-6">
          <h2 className="text-2xl mb-4">Cliente</h2>
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Teléfono:</strong> {order.customer_phone}
            </p>
            <p>
              <strong>Cédula:</strong> {order.customer_document}
            </p>
          </div>
          <a
            href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 px-4 py-2 bg-green-600 hover:bg-green-500 flex justify-center items-center gap-2 text-white rounded-xl">
            <span>Abrir WhatsApp</span>
            <FontAwesomeIcon icon={faWhatsapp}/>
          </a>
        </div>

        {/* ORDEN */}

        <div className="shadow-md border border-(--grayBlume) rounded-2xl p-6">
          <h2 className="text-2xl mb-4">Pedido</h2>
          <div className="space-y-2">
            <p>
              <strong>Pago:</strong> {order.payment_method}
            </p>
            <p>
              <strong>Envío:</strong> {order.shipping_method}
            </p>
            {order.delivery_zone && (
              <p>
                <strong>Zona:</strong> {order.delivery_zone}
              </p>
            )}
            {order.agency_address && (
              <p>
                <strong>MRW:</strong> {order.agency_address}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label className="block mb-2 font-medium">Estado</label>
            <select
              value={order.status}
              onChange={handleStatusChange}
              className="w-full shadow-sm border border-(--grayBlume) rounded-xl p-3"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTOS */}

      <div className="mt-8 shadow-md border border-(--grayBlume) rounded-2xl p-6">
        <h2 className="text-2xl mb-6">Productos</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-(--grayBlume) pb-3"
            >
              <div>
                <p className="font-medium">{item.product_name}</p>

                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <div>${Number(item.subtotal).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div
          className="
            flex
            justify-end
            mt-6
            text-2xl
            font-bold
          "
        >
          Total: ${Number(order.total).toFixed(2)}
        </div>
      </div>
    </main>
  );
}
