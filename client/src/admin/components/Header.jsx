import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

import {
  faBars,
  faXmark,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { user } = useAuth();
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <header className="bg-white h-16 px-3 sm:px-6 flex justify-between items-center border-b border-(--grayBlume) shadow-md z-20 relative">
      <div className="flex items-center gap-3">
        {/* Botón para Móvil: Menú Hamburguesa / X */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-(--pinkRose) hover:text-white border border-(--grayBlume) shadow-sm transition cursor-pointer"
          aria-label="Abrir menú"
        >
          <FontAwesomeIcon icon={collapsed ? faXmark : faBars} />
        </button>

        {/* Botón para Escritorio: Flechas para colapsar sidebar */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg hover:bg-(--pinkRose) hover:text-white border border-(--grayBlume) shadow-sm transition cursor-pointer"
          aria-label="Colapsar menú"
        >
          <FontAwesomeIcon icon={collapsed ?  faAnglesLeft : faAnglesRight} />
        </button>

        <h2 className="text-base sm:text-xl md:text-2xl font-semibold truncate max-w-[160px] sm:max-w-xs md:max-w-none">
          Panel Admin
        </h2>
      </div>

      {/* Usuario / Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-right">
          <p className="font-medium text-xs sm:text-base leading-tight">
            {user?.first_name || "Admin"}
          </p>

          <p className="text-xs text-gray-500 hidden sm:block">{user?.email}</p>
        </div>

        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.first_name || "Admin"}`
          }
          alt="avatar"
          className="
            w-9
            h-9
            sm:w-12
            sm:h-12
            rounded-full
            border
            border-gray-200
            object-cover
          "
        />
      </div>
    </header>
  );
}
