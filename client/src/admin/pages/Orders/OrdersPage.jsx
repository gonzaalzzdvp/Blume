import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../../services/adminOrderService";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.order_number
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    confirmed: orders.filter((order) => order.status === "confirmed").length,
    completed: orders.filter((order) => order.status === "completed").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  function getStatusStyles(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";

      case "confirmed":
        return "bg-blue-100 text-blue-800";

      case "completed":
        return "bg-green-100 text-green-800";

      case "cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case "pending":
        return "Pendiente";

      case "confirmed":
        return "Confirmada";

      case "completed":
        return "Completada";

      case "cancelled":
        return "Cancelada";

      default:
        return status;
    }
  }

  return (
    <main className="p-8">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-(--grayBlume) bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total</p>

          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="p-5 rounded-2xl border border-yellow-200 bg-yellow-50 shadow-sm">
          <p className="text-sm text-yellow-700">Pendientes</p>

          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
        </div>

        <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50 shadow-sm">
          <p className="text-sm text-blue-700">Confirmadas</p>
          <p className="text-3xl font-bold text-blue-700">{stats.confirmed}</p>
        </div>
        <div className="p-5 rounded-2xl border border-green-200 bg-green-50 shadow-sm">
          <p className="text-sm text-green-700">Completadas</p>
          <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
        </div>
        <div className="p-5 rounded-2xl border border-red-200 bg-red-50 shadow-sm">
          <p className="text-sm text-red-700">Canceladas</p>
          <p className="text-3xl font-bold text-red-700">{stats.cancelled}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <h1 className="text-4xl">Órdenes</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar orden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-3 border border-(--grayBlume) shadow-sm rounded-xl outline-none focus:border-(--pinkRose)"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-(--grayBlume) rounded-xl outline-none focus:border-(--pinkRose) shadow-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md border border-(--grayBlume) rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Orden</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-(--grayBlume) hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-(--pinkRose) hover:underline font-medium"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="p-3">{order.customer_name}</td>
                  <td className="p-3">{order.customer_phone}</td>
                  <td className="p-3">${order.total}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No se encontraron órdenes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
