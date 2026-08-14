import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { getMyOrders } from "../../services/orderService";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
      <main className="mt-16 sm:mt-22 min-h-[calc(100vh-88px)] flex items-center justify-center p-4">
        <p className="text-gray-500 font-medium">Cargando perfil...</p>
      </main>
    );
  }

  return (
    <main className="mt-16 sm:mt-22 min-h-[calc(100vh-88px)] max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6 sm:gap-8">
      <h1 className="text-2xl sm:text-4xl font-bold">Mi Perfil</h1>

      {/* Tarjeta de Información de Usuario */}
      <div className="border border-(--grayBlume) rounded-2xl p-5 sm:p-8 shadow-sm bg-white">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-(--pinkRose) text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0">
            {user.first_name?.charAt(0) || user.username?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-semibold truncate">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 truncate">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="text-xs sm:text-sm text-gray-500">Nombre</label>
            <p className="text-base sm:text-lg font-medium">
              {user.first_name || "No registrado"}
            </p>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-500">Apellido</label>
            <p className="text-base sm:text-lg font-medium">
              {user.last_name || "No registrado"}
            </p>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-500">Usuario</label>
            <p className="text-base sm:text-lg font-medium">{user.username}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-500">Correo</label>
            <p className="text-base sm:text-lg font-medium break-all">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Botón Cerrar Sesión */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="
            group
            w-full
            sm:w-40
            h-11
            sm:h-12
            flex
            items-center
            justify-center
            rounded-lg
            hover:bg-red-50
            hover:text-red-600
            hover:border-red-200
            border
            border-(--grayBlume)
            shadow-sm
            cursor-pointer
            transition-colors
            duration-200
          "
        >
          <span className="block group-hover:hidden text-sm font-medium">
            Cerrar sesión
          </span>
          <span className="hidden group-hover:block text-base sm:text-lg">
            <FontAwesomeIcon icon={faDoorOpen} />
          </span>
        </button>
      </div>

      {/* Sección de Pedidos */}
      <div>
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Mis pedidos
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            No tienes pedidos registrados aún.
          </p>
        ) : (
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
                  p-4
                  sm:p-6
                  shadow-sm
                  hover:border-(--pinkRose)
                  transition-colors
                  bg-white
                "
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                  <p className="font-bold text-sm sm:text-base">
                    Número de orden:{" "}
                    <span className="font-medium text-(--pinkRose)">
                      {order.order_number}
                    </span>
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    ${order.total}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Estado:</span>
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium ${getStatusClasses(
                        order.status,
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <p className="text-gray-500">
                    <span className="font-bold text-gray-700">Fecha: </span>
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
