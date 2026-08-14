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
    <main className="w-full p-4 sm:p-6 lg:p-8">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Órdenes</h1>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Administra y consulta los pedidos de la tienda.
        </p>
      </div>

      {/* ============================= */}
      {/* STATS */}
      {/* ============================= */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* TOTAL */}

        <div
          className="
            p-4
            sm:p-5
            rounded-2xl
            border
            border-(--grayBlume)
            bg-white
            shadow-sm
          "
        >
          <p className="text-xs sm:text-sm text-gray-500">Total</p>

          <p className="mt-1 text-2xl sm:text-3xl font-bold">{stats.total}</p>
        </div>

        {/* PENDING */}

        <div
          className="
            p-4
            sm:p-5
            rounded-2xl
            border
            border-yellow-200
            bg-yellow-50
            shadow-sm
          "
        >
          <p className="text-xs sm:text-sm text-yellow-700">Pendientes</p>

          <p className="mt-1 text-2xl sm:text-3xl font-bold text-yellow-700">
            {stats.pending}
          </p>
        </div>

        {/* CONFIRMED */}

        <div
          className="
            p-4
            sm:p-5
            rounded-2xl
            border
            border-blue-200
            bg-blue-50
            shadow-sm
          "
        >
          <p className="text-xs sm:text-sm text-blue-700">Confirmadas</p>

          <p className="mt-1 text-2xl sm:text-3xl font-bold text-blue-700">
            {stats.confirmed}
          </p>
        </div>

        {/* COMPLETED */}

        <div
          className="
            p-4
            sm:p-5
            rounded-2xl
            border
            border-green-200
            bg-green-50
            shadow-sm
          "
        >
          <p className="text-xs sm:text-sm text-green-700">Completadas</p>

          <p className="mt-1 text-2xl sm:text-3xl font-bold text-green-700">
            {stats.completed}
          </p>
        </div>

        {/* CANCELLED */}

        <div
          className="
            p-4
            sm:p-5
            rounded-2xl
            border
            border-red-200
            bg-red-50
            shadow-sm
          "
        >
          <p className="text-xs sm:text-sm text-red-700">Canceladas</p>

          <p className="mt-1 text-2xl sm:text-3xl font-bold text-red-700">
            {stats.cancelled}
          </p>
        </div>
      </div>

      {/* ============================= */}
      {/* SEARCH + FILTER */}
      {/* ============================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-6
        "
      >
        <h2 className="text-lg sm:text-xl font-semibold">Todas las órdenes</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Buscar orden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              sm:w-72
              lg:w-80
              px-4
              py-3
              border
              border-(--grayBlume)
              shadow-sm
              rounded-xl
              outline-none
              focus:border-(--pinkRose)
            "
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              sm:w-auto
              px-4
              py-3
              border
              border-(--grayBlume)
              rounded-xl
              outline-none
              focus:border-(--pinkRose)
              shadow-sm
              bg-white
            "
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>

      {/* ============================= */}
      {/* MOBILE / TABLET CARDS */}
      {/* ============================= */}

      <div className="lg:hidden space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Link
              key={order.id}
              to={`/admin/orders/${order.id}`}
              className="
                block
                bg-white
                border
                border-(--grayBlume)
                rounded-2xl
                p-4
                sm:p-5
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* ORDER HEADER */}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Orden</p>

                  <p className="mt-1 font-semibold text-(--pinkRose) break-all">
                    {order.order_number}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    inline-flex
                    items-center
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    ${getStatusStyles(order.status)}
                  `}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* CUSTOMER */}

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Cliente</p>

                  <p className="mt-1 font-medium break-words">
                    {order.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Teléfono</p>

                  <p className="mt-1 text-sm">{order.customer_phone}</p>
                </div>
              </div>

              {/* TOTAL */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-5
                  pt-4
                  border-t
                  border-(--grayBlume)
                "
              >
                <span className="text-sm text-gray-500">Total</span>

                <span className="text-lg font-bold">${order.total}</span>
              </div>
            </Link>
          ))
        ) : (
          <div
            className="
              bg-white
              border
              border-(--grayBlume)
              rounded-2xl
              p-8
              text-center
              text-gray-500
            "
          >
            No se encontraron órdenes.
          </div>
        )}
      </div>

      {/* ============================= */}
      {/* DESKTOP TABLE */}
      {/* ============================= */}

      <div
        className="
          hidden
          lg:block
          overflow-hidden
          shadow-md
          border
          border-(--grayBlume)
          rounded-2xl
          bg-white
        "
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-sm font-semibold">Orden</th>

              <th className="p-4 text-left text-sm font-semibold">Cliente</th>

              <th className="p-4 text-left text-sm font-semibold">Teléfono</th>

              <th className="p-4 text-left text-sm font-semibold">Total</th>

              <th className="p-4 text-left text-sm font-semibold">Estado</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="
                    border-t
                    border-(--grayBlume)
                    hover:bg-gray-50
                    transition
                  "
                >
                  <td className="p-4">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="
                        text-(--pinkRose)
                        hover:underline
                        font-medium
                      "
                    >
                      {order.order_number}
                    </Link>
                  </td>

                  <td className="p-4">{order.customer_name}</td>

                  <td className="p-4">{order.customer_phone}</td>

                  <td className="p-4 font-medium">${order.total}</td>

                  <td className="p-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${getStatusStyles(order.status)}
                      `}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
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
