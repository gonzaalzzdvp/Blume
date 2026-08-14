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
          fixed
          top-0
          bottom-0
          left-0
          w-[85vw]
          max-w-sm
          bg-white
          z-50
          flex
          flex-col
          h-dvh
          transition-transform
          duration-300
          ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Contenedor deslizante */}
        <div className="relative w-full h-full overflow-hidden flex-1 min-h-0">
          {/* Menú principal */}
          <div
            className={`
              absolute
              inset-0
              w-full
              h-full
              bg-white
              flex
              flex-col
              transition-transform
              duration-300
              ease-in-out
              ${categoriesOpen ? "-translate-x-full" : "translate-x-0"}
            `}
          >
            {/* Header */}
            <div className="h-16 px-4 flex justify-between items-center shrink-0">
              <Link to="/">
                <img
                  src="/Logo/BlumeLogo2.png"
                  alt="Blume Logo"
                  className="h-10"
                />
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCategoriesOpen(false);
                }}
                className="p-2"
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
            <div
              className="
                h-10
                my-2
                mx-3
                px-4
                bg-gray-100
                flex
                items-center
                gap-3
                rounded-4xl
                shrink-0
              "
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  flex-1
                  min-w-0
                  bg-transparent
                  outline-none
                  text-base
                  placeholder:text-gray-400
                "
              />

              <button type="button" onClick={handleSearch} className="shrink-0">
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

            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto font-ranade-regular">
                {/* Enlaces de Navegación */}
                <div
                  className="
                    min-h-14
                    px-4
                    py-3
                    flex
                    items-center
                    text-lg
                    hover:bg-(--grayBlume)
                    hover:text-(--blackBean)
                  "
                >
                  <Link to="/catalog">
                    <span className="cursor-pointer">Todos los productos</span>
                  </Link>
                </div>
                {/* Categorías */}
                {/* Categorías */}

                <button
                  type="button"
                  onClick={() => setCategoriesOpen(true)}
                  className="
      min-h-14
      w-full
      px-4
      py-3
      flex
      justify-between
      items-center
      text-lg
      hover:bg-(--grayBlume)
      hover:text-(--blackBean)
    "
                >
                  <span>Categorías</span>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="
                      cursor-pointer
                      text-(--blackBean)
                      hover:text-(--pinkRose)
                    "
                  />
                </button>

                <div
                  className="
                    min-h-14
                    px-4
                    py-3
                    flex
                    items-center
                    text-lg
                    hover:bg-(--grayBlume)
                    hover:text-(--blackBean)
                  "
                >
                  <span className="cursor-pointer">Más vendidos</span>
                </div>

                <div
                  className="
                    min-h-14
                    px-4
                    py-3
                    flex
                    items-center
                    text-lg
                    hover:bg-(--grayBlume)
                    hover:text-(--blackBean)
                  "
                >
                  <span className="cursor-pointer">Beneficios</span>
                </div>
              </div>
              <div
                className="
                  border-t
                  border-(--grayBlume)
                  font-ranade-regular
                  shrink-0
                "
              >
                {authenticated ? (
                  <Link
                    to="/profile"
                    className="
                      min-h-14
                      px-4
                      py-3
                      flex
                      items-center
                      gap-3
                      text-lg
                      hover:bg-(--grayBlume)
                      hover:text-(--blackBean)
                    "
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl text-(--blackBean)"
                    />

                    <span>Perfil</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="
                      min-h-14
                      px-4
                      py-3
                      flex
                      items-center
                      gap-3
                      text-lg
                      hover:bg-(--grayBlume)
                      hover:text-(--blackBean)
                    "
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl text-(--blackBean)"
                    />

                    <span>Iniciar sesión</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Pantalla Categorías */}
          <div
            className={`
              absolute
              inset-0
              w-full
              h-full
              bg-white
              flex
              flex-col
              border-r
              border-(--citron)
              transition-transform
              duration-300
              ease-in-out
              ${categoriesOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            {/* Header Categorías */}
            <div className="h-16 px-4 flex items-center gap-6 shrink-0">
              <button
                type="button"
                onClick={() => setCategoriesOpen(false)}
                className="p-2"
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="
                    cursor-pointer
                    text-xl
                    text-(--blackBean)
                    hover:text-(--pinkRose)
                  "
                />
              </button>

              <span className="font-clash-light uppercase">Categorías</span>
            </div>

            {/* Grid categorías */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="p-4 grid grid-cols-2 gap-y-8 gap-x-2">
                {categories.map((category) => (
                  <Link
                    to={`/catalog?category=${category.slug}`}
                    key={category.id}
                    className="flex flex-col min-w-0"
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden">
                      <img
                        src={categoryImages[category.slug]}
                        alt={category.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-300
                          hover:scale-105
                        "
                      />
                    </div>

                    <span className="mt-2 text-sm font-ranade-regular">
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
