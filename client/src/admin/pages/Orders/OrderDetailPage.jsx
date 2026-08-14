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
    return (
      <main className="p-4 sm:p-8 text-center text-gray-500">Cargando...</main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header adaptable */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {order.order_number}
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="w-full sm:w-auto text-center px-4 py-2 hover:bg-(--pinkRose) hover:text-white transition-colors shadow-sm border border-(--grayBlume) rounded-xl font-medium"
        >
          Volver
        </Link>
      </div>

      {/* Secciones Cliente y Pedido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* CLIENTE */}
        <div className="shadow-md border border-(--grayBlume) rounded-2xl p-4 sm:p-6 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Cliente</h2>
          <div className="space-y-2 text-sm md:text-base">
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
            className="mt-5 w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-500 transition-colors flex justify-center items-center gap-2 text-white font-medium rounded-xl"
          >
            <span>Abrir WhatsApp</span>
            <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
          </a>
        </div>

        {/* ORDEN */}
        <div className="shadow-md border border-(--grayBlume) rounded-2xl p-4 sm:p-6 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Pedido</h2>
          <div className="space-y-2 text-sm md:text-base">
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
            <label className="block mb-2 text-sm font-medium">Estado</label>
            <select
              value={order.status}
              onChange={handleStatusChange}
              className="w-full shadow-sm border border-(--grayBlume) rounded-xl p-3 outline-none focus:border-(--pinkRose) bg-white"
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
      <div className="mt-6 md:mt-8 shadow-md border border-(--grayBlume) rounded-2xl p-4 sm:p-6 bg-white">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
          Productos
        </h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start gap-4 border-b border-(--grayBlume) pb-3"
            >
              <div>
                <p className="font-medium text-sm md:text-base">
                  {item.product_name}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <div className="font-semibold text-sm md:text-base">
                ${Number(item.subtotal).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 text-xl md:text-2xl font-bold">
          Total: ${Number(order.total).toFixed(2)}
        </div>
      </div>
    </main>
  );
}
