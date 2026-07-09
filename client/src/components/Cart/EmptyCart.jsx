import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <FontAwesomeIcon
        icon={faBagShopping}
        className="text-7xl text-(--pinkRose)"
      />

      <h2 className="mt-6 text-3xl font-semibold">
        Tu carrito está vacío
      </h2>

      <p className="mt-3 text-gray-500">
        Agrega algunos productos para comenzar tu compra.
      </p>

      <Link
        to="/catalog"
        className="
          mt-8
          bg-(--pinkRose)
          text-white
          px-6
          py-3
          rounded-lg
          hover:opacity-90
          transition
        "
      >
        Ir al catálogo
      </Link>

    </div>
  );
}