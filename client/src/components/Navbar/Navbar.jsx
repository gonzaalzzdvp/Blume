import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBagShopping,
  faMagnifyingGlass,
  faAngleRight,
  faAngleLeft,
  faXmark,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { authenticated, user } = useAuth();

  const categories = ["Hidratación", "Diario", "Volumen", "Rizos", "Violeta"];

  const handleSearch = () => {
    const query = search.trim();

    if (!query) return;

    navigate(`/catalog?search=${encodeURIComponent(query)}`);

    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setShowPromo(true);
      } else if (currentScrollY > lastScrollY) {
        setShowPromo(false);
      } else {
        setShowPromo(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  }, [location]);

  return (
    <>
      {/* Barra promocional */}

      <div
        className={`
            fixed
            top-0
            left-0
            w-full
            h-6
            bg-(--citron)
            flex
            justify-center
            items-center
            text-(--whiteBlume)
            font-semibold
            z-50
            transition-transform
            duration-300
            ${showPromo ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <p className="text-m">20% de descuento en toda la mercancía</p>
      </div>

      {/* Navbar */}

      <div
        className={`
            fixed
            left-0
            w-full
            h-16
            px-5
            flex
            justify-between
            items-center
            border-b
            border-gray-400
            shadow-sm
            bg-white
            z-50
            transition-all
            duration-300
            ${showPromo ? "top-6" : "top-0"}
        `}
      >
        <button onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl text-(--pinkRose) hover:text-(--blackBean) cursor-pointer"
          />
        </button>

        <Link to="/">
          <h1 className="text-3xl text-(--blackBean) hover:text-(--pinkRose)">
            Blume
          </h1>
        </Link>
        <div className="flex justify-center items-center gap-10">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex flex-col justify-center items-center gap-1"
            >
              <FontAwesomeIcon
                icon={faGears}
                className="text-(--blackBean) hover:text-(--pinkRose) text-xl"
              />
              <span className="text-sm text-(--blackBean) hover:text-(--pinkRose)">
                Admin Panel
              </span>
            </Link>
          )}

          <Link to="/cart">
            <div className="relative">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-2xl text-(--pinkRose)"
              />

              {cartCount > 0 && (
                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-(--blackBean)
                  text-white
                  text-xs
                  flex
                  items-center
                  justify-center
                "
                >
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

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
          fixed top-0 left-0 h-screen w-70 bg-white z-50
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
              ${categoriesOpen ? "-translate-x-full" : "translate-x-0"} border-r border-(--citron)
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
                  text-(--pinkRose) 
                  cursor-pointer 
                  transition-transform
                  duration-500
                  hover:rotate-180"
                />
              </button>
            </div>

            {/* Buscar */}

            <div className="h-14 px-4 flex items-center gap-3 border-b border-(--citron)">
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
                    text-(--pinkRose)
                    cursor-pointer
                    hover:scale-110
                    transition-transform
                  "
                />
              </button>
            </div>

            {/* Todos */}

            <div className="h-14 px-4 flex items-center text-lg uppercase border-b border-(--citron)">
              <Link to="/catalog">
                <span className="cursor-pointer hover:text-(--citron)">
                  Todos los productos
                </span>
              </Link>
            </div>

            {/* Categorías */}

            <button
              onClick={() => setCategoriesOpen(true)}
              className="h-14 w-full px-4 flex justify-between items-center text-lg uppercase border-b border-(--citron)"
            >
              <span className="hover:text-(--citron)">Categorías</span>

              <FontAwesomeIcon
                icon={faAngleRight}
                className="cursor-pointer text-(--pinkRose)"
              />
            </button>

            {/* Más vendidos */}

            <div className="h-14 px-4 flex items-center text-lg uppercase border-b border-(--citron)">
              <span className="cursor-pointer hover:text-(--citron)">
                Más vendidos
              </span>
            </div>

            {/* Beneficios */}

            <div className="h-14 px-4 flex items-center text-lg uppercase border-b border-(--citron)">
              <span className="cursor-pointer hover:text-(--citron)">
                Beneficios
              </span>
            </div>

            {/* Beneficios */}

            <div className="h-14 px-4 flex items-center text-lg uppercase border-b border-(--citron)">
              <span className="cursor-pointer hover:text-(--citron)">
                <Link to="/login">Inicio de Sesion</Link>
              </span>
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
            {/* Header */}

            <div className="h-16 px-4 flex jus items-center gap-15">
              <button onClick={() => setCategoriesOpen(false)}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="cursor-pointer text-xl text-(--pinkRose)"
                />
              </button>

              <span className="font-semibold uppercase">Categorías</span>
            </div>

            {/* Grid categorías */}

            <div className="grid grid-cols-2 gap-y-8 py-6">
              {categories.map((category) => (
                <div key={category} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-(--blackBean) cursor-pointer" />

                  <span className="mt-2 cursor-pointer text-center">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
