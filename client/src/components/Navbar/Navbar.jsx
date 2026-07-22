import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import Slider from "./Slider";
import Sidebar from "./Sidebar"; // Importamos el nuevo aside

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBagShopping,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const { cartCount } = useCart();
  const { user } = useAuth();

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

  return (
    <>
      {/* Barra promocional */}
      <Slider showPromo={setShowPromo} />

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
          bg-white
          z-50
          transition-all
          duration-300
          ${showPromo ? "top-6" : "top-0"}
        `}
      >
        {/* Botón para abrir el Sidebar */}
        <button onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl text-(--blackBean) hover:text-(--pinkRose) cursor-pointer"
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
              className="flex flex-col justify-center items-center gap-1 text-(--blackBean) hover:text-(--pinkRose)"
            >
              <FontAwesomeIcon icon={faGears} className=" text-xl" />
              <span className="text-sm">Admin Panel</span>
            </Link>
          )}

          <Link to="/cart">
            <div className="relative">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-2xl text-(--blackBean) hover:text-(--pinkRose)"
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

      {/* Sidebar */}
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
