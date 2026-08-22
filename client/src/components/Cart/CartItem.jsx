import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div
      className="
        p-4
        sm:p-5
        flex
        flex-col
        sm:flex-row
        justify-between
        items-start
        sm:items-center
        gap-4
        sm:gap-0
        rounded-xl
        shadow-md
        bg-white
      "
    >
      {/* Contenedor de Imagen e Información */}
      <div className="flex gap-3 sm:gap-5 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.title}
          className="
            w-20
            h-20
            sm:w-28
            sm:h-28
            object-cover
            rounded-lg
            flex-shrink-0
          "
        />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-base sm:text-xl font-clash-light leading-snug line-clamp-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {item.brand} {item.size && `• ${item.size}`}
            </p>

            <p className="text-sm sm:text-base font-ranade-regular mt-1">
              ${item.price}
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="w-7 h-7 sm:w-8 sm:h-8 shadow-sm border border-(--grayBlume) rounded-full hover:bg-(--grayBlume) cursor-pointer flex items-center justify-center font-medium"
            >
              -
            </button>

            <span className="font-semibold text-sm sm:text-base text-(--blackBean)">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="w-7 h-7 sm:w-8 sm:h-8 shadow-sm border border-(--grayBlume) rounded-full hover:bg-(--grayBlume) cursor-pointer flex items-center justify-center font-medium"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de Subtotal y Acción de Eliminar */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-2 sm:gap-5">
        <span className="text-lg sm:text-xl font-ranade-bold">
          ${(Number(item.price) * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-(--orangeBlume) hover:text-(--blackBean) text-xl sm:text-2xl cursor-pointer p-1 transition-colors"
          title="Eliminar producto"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
