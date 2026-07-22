import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../services/categoryService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleRight,
  faAngleLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar({ menuOpen, setMenuOpen }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticated, logout } = useAuth();
  const [categories, setCategories] = useState([]);

  const categoryImages = {
    hidratacion: "/categories/hydrating.png",
    diario: "/categories/daily.png",
    volumen: "/categories/volume.png",
    rizos: "/categories/curls.png",
    violeta: "/categories/blonde.png",
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  }, [location, setMenuOpen]);

  const handleSearch = () => {
    const query = search.trim();
    if (!query) return;

    navigate(`/catalog?search=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  async function handleLogout() {
    try {
      await logout();

      setMenuOpen(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => {
          setMenuOpen(false);
          setCategoriesOpen(false);
        }}
        className={`
          fixed inset-0 bg-black/30 z-40 transition-opacity duration-300
          ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 w-100 bg-white z-50
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Contenedor deslizante */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Menú principal */}
          <div
            className={`
              absolute top-0 left-0 w-full h-full bg-white
              transition-transform duration-300 ease-in-out
              ${categoriesOpen ? "-translate-x-full" : "translate-x-0"} 
            `}
          >
            {/* Header */}
            <div className="h-16 px-4 flex justify-between items-center ">
              <Link to="/">
                <h2 className="text-xl text-(--blackBean) hover:text-(--pinkRose)">
                  Blume
                </h2>
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCategoriesOpen(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="
                    text-xl 
                    text-(--blackBean)
                    hover:text-(--pinkRose) 
                    cursor-pointer 
                    transition-transform
                    duration-500
                    hover:rotate-180"
                />
              </button>
            </div>

            {/* Buscar */}
            <div className="h-10 my-2 mx-3 px-4 bg-gray-100 flex items-center gap-3 rounded-4xl">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-base
                  placeholder:text-gray-400
                "
              />
              <button onClick={handleSearch}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="
                    text-xl
                    text-(--blackBean)
                    cursor-pointer
                    hover:scale-110
                    transition-transform
                    "
                />
              </button>
            </div>

            <div className="h-[calc(100vh-120px)] flex flex-col">
              <div className="flex-1">
                {/* Enlaces de Navegación */}
                <div className="h-14 px-4 flex items-center text-lg hover:bg-(--grayBlume) hover:text-(--blackBean)">
                  <Link to="/catalog">
                    <span className="cursor-pointer">Todos los productos</span>
                  </Link>
                </div>
                {/* Categorías */}
                <button
                  onClick={() => setCategoriesOpen(true)}
                  className="h-14 w-full px-4 flex justify-between items-center text-lg hover:bg-(--grayBlume) hover:text-(--blackBean)"
                >
                  <span>Categorías</span>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="cursor-pointer text-(--blackBean) hover:text-(--pinkRose)"
                  />
                </button>
                <div className="h-14 px-4 flex items-center text-lg hover:bg-(--grayBlume) hover:text-(--blackBean)">
                  <span className="cursor-pointer">Más vendidos</span>
                </div>
                <div className="h-14 px-4 flex items-center text-lg hover:bg-(--grayBlume) hover:text-(--blackBean)">
                  <span className="cursor-pointer">Beneficios</span>
                </div>
              </div>
              <div className="border-t border-(--grayBlume)">
                {authenticated ? (
                  <button
                    onClick={handleLogout}
                    className="hover:bg-(--grayBlume) h-14 w-full px-4 flex items-center gap-3 text-lg hover:text-(--blackBean) cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-xl" />

                    <span>Cerrar sesión</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="h-14 px-4 flex items-center gap-3 text-lg hover:bg-(--grayBlume) hover:text-(--blackBean)"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-xl" />

                    <span>Iniciar sesión</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Pantalla Categorías */}
          <div
            className={`
              absolute top-0 left-0 w-full h-full bg-white
              transition-transform duration-300 ease-in-out
              ${categoriesOpen ? "translate-x-0" : "translate-x-full"} border-r border-(--citron)
            `}
          >
            {/* Header Categorías */}
            <div className="h-16 px-4 flex items-center gap-15">
              <button onClick={() => setCategoriesOpen(false)}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="cursor-pointer text-xl text-(--pinkRose)"
                />
              </button>
              <span className="font-semibold uppercase">Categorías</span>
            </div>

            {/* Grid categorías */}
            <div className="h-[calc(100vh-64px)] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-y-8 gap-2">
                {categories.map((category) => (
                  <Link
                    to={`/catalog?category=${category.slug}`}
                    key={category.id}
                    className="flex flex-col"
                  >
                    <div className="w-full h-30 rounded-xl overflow-hidden">
                      <img
                        src={categoryImages[category.slug]}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {category.name} {" >"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
