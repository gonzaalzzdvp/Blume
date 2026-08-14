import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CartSummary({ onCheckout }) {
  const { cartTotal, clearCart } = useCart();

  return (
    <div className="mt-6 sm:mt-8 border-t border-(--grayBlume) pt-4 sm:pt-6 flex flex-col justify-between items-center w-full">
      {/* Fila superior: Vaciar carrito + Total */}
      <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0">
        <button
          onClick={clearCart}
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
          <span className="block group-hover:hidden text-xs sm:text-sm font-ranade-regular">
            Vaciar carrito
          </span>
          <span className="hidden group-hover:block text-base sm:text-lg">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>

        <div className="text-right flex justify-between sm:block items-center">
          <p className="text-gray-500 font-ranade-regular text-sm sm:text-base">
            Total
          </p>

          <h2 className="text-2xl sm:text-3xl font-ranade-bold">
            ${cartTotal.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Botón de Checkout */}
      <Link
        to="/checkout"
        className="
          text-center
          w-full
          mt-5
          sm:mt-6
          py-3.5
          sm:py-4
          flex
          items-center
          justify-center
          bg-(--pinkRose)
          hover:bg-(--citron)
          text-white
          rounded-xl
          font-ranade-regular
          text-base
          sm:text-lg
          transition-colors
          duration-200
        "
      >
        Continuar compra
      </Link>
    </div>
  );
}
