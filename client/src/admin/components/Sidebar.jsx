import { NavLink, Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

import {
  faChartLine,
  faBox,
  faTags,
  faCartShopping,
  faUsers,
  faGear,
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
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`bg-white border-r border-(--grayBlume) shadow-md transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
      <div className="h-16 flex items-center justify-center">
        <Link to="/">
          <h1 className="text-2xl text-(--pinkRose)">Blume</h1>
        </Link>
      </div>

      <nav className="mt-6 flex flex-col">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-4
              px-6
              py-4
              transition
              ${isActive ? "bg-(--pinkRose) text-white" : "hover:bg-gray-100"}
            `
            }
          >
            <FontAwesomeIcon icon={link.icon} />

            {!collapsed && <span>{link.title}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
