import { NavLink, Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

import {
  faChartLine,
  faBox,
  faTags,
  faCartShopping,
  faUsers,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
  {
    title: "Dashboard",
    icon: faChartLine,
    path: "/admin",
  },
  {
    title: "Productos",
    icon: faBox,
    path: "/admin/products",
  },
  {
    title: "Categorías",
    icon: faTags,
    path: "/admin/categories",
  },
  {
    title: "Órdenes",
    icon: faCartShopping,
    path: "/admin/orders",
  },
  {
    title: "Usuarios",
    icon: faUsers,
    path: "/admin/users",
  },
  {
    title: "Configuración",
    icon: faGear,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Backdrop para móviles (Oculta el menú al hacer clic afuera) */}
      {collapsed && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0 bottom-0
          z-40
          bg-white
          border-r border-(--grayBlume)
          shadow-md
          transition-all duration-300 ease-in-out
          flex flex-col
          
          /* Comportamiento Móvil: Flotante desde la izquierda */
          ${collapsed ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}

          /* Comportamiento Escritorio: Ancho variable */
          ${collapsed ? "lg:w-72" : "lg:w-20"}
        `}
      >
        {/* Encabezado Sidebar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 md:border-b-0 md:justify-center">
          <Link to="/" onClick={() => toggleSidebar()}>
            <h1 className="text-2xl font-bold text-(--pinkRose)">Blume</h1>
          </Link>

          {/* Botón cerrar para móvil */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700 p-1"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

        {/* Links de Navegación */}
        <nav className="mt-4 flex flex-col flex-1 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              onClick={() => {
                // En móvil se cierra al seleccionar un enlace
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-6
                py-3.5
                transition-colors
                ${
                  isActive
                    ? "bg-(--pinkRose) text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `
              }
            >
              <FontAwesomeIcon
                icon={link.icon}
                className="text-lg w-5 text-center"
              />

              {/* El texto se muestra en móvil si está desplegado y en escritorio según colapso */}
              <span className={`block md:${collapsed ? "block" : "hidden"}`}>
                {link.title}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
