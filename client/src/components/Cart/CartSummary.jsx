import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CartSummary({ onCheckout }) {
  const { cartTotal, clearCart } = useCart();

  return (
    <div className=" mt-8 border-t border-(--grayBlume) pt-6 flex flex-col justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={clearCart}
          className="group w-40 h-12 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-(--grayBlume) shadow-sm cursor-pointer transition-colors duration-200"
        >
          <span className="block group-hover:hidden text-sm font-medium">
            Vaciar carrito
          </span>
          <span className="hidden group-hover:block text-lg">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>

        <div className="text-right">
          <p className="text-gray-500">Total</p>

          <h2 className="text-3xl font-bold">${cartTotal.toFixed(2)}</h2>
        </div>
      </div>
      <Link
        to="/checkout"
        className="
            text-center
            w-full
            mt-6
            py-4
            flex
            items-center
            justify-center
            bg-(--pinkRose)
            hover:bg-(--citron)
            text-white
            rounded-xl
          "
      >
        Continuar compra
      </Link>
    </div>
  );
}
