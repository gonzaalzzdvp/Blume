import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { getMyOrders } from "../../services/orderService";

export default function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  function getStatusClasses(status) {
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
        return "bg-gray-100 text-gray-800";
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

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) {
    return (
      <main className="mt-22 min-h-[calc(100vh-88px)] flex items-center justify-center">
        <p>Cargando perfil...</p>
      </main>
    );
  }

  return (
    <main className="mt-22 min-h-[calc(100vh-88px)] max-w-4xl mx-auto p-6 flex flex-col gap-5">
      <h1 className="text-4xl font-bold mb-8">Mi Perfil</h1>
      <div className="border border-(--grayBlume) rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-(--pinkRose) text-white flex items-center justify-center text-3xl font-bold">
            {user.first_name?.charAt(0) || user.username?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Nombre</label>
            <p className="text-lg font-medium">
              {user.first_name || "No registrado"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Apellido</label>
            <p className="text-lg font-medium">
              {user.last_name || "No registrado"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Usuario</label>
            <p className="text-lg font-medium">{user.username}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Correo</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="group w-40 h-12 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-(--grayBlume) shadow-sm cursor-pointer transition-colors duration-200"
        >
          <span className="block group-hover:hidden text-sm font-medium">
            Cerrar sesión
          </span>
          <span className="hidden group-hover:block text-lg">
            <FontAwesomeIcon icon={faDoorOpen} />
          </span>
        </button>
      </div>
      <h2 className="text-4xl font-bold mb-8">Mis pedidos</h2>
      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            to={`/profile/orders/${order.id}`}
            key={order.id}
            className="
              block
              border
              border-(--grayBlume)
              rounded-2xl
              p-8
              shadow-sm
              hover:border-(--pinkRose)
              transition-colors
            "
          >
            <p className="font-bold">
              Número de orden:{" "}
              <span className="font-medium text-(--pinkRose)">
                {order.order_number}
              </span>
            </p>

            <p>${order.total}</p>

            <p className="font-bold flex items-center gap-2">
              Status:
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </p>

            <p className="font-bold">
              Fecha:{" "}
              <span className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
