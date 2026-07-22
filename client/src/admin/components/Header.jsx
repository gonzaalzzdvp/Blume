import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

import {
  faBars,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { user } = useAuth();
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <header
      className="bg-white h-16 py-2 flex justify-between items-center border-b border-(--grayBlume) shadow-md">
      <div>
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-r-lg hover:bg-(--pinkRose) hover:text-(--whiteBlume) border-y border-r border-(--grayBlume) shadow-sm transition cursor-pointer">
          <FontAwesomeIcon icon={collapsed ? faAnglesRight : faAnglesLeft} />
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Panel Administrativo</h2>
      </div>

      <div className="pr-4 flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">{user?.first_name}</p>

          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <img
          src={user?.avatar || "https://ui-avatars.com/api/?name=Admin"}
          alt="avatar"
          className="
            w-12
            h-12
            rounded-full
            border
          "
        />
      </div>
    </header>
  );
}
