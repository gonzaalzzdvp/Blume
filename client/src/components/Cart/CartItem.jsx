import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div
      className="
        flex
        justify-between
        items-center
        border
        border-(--citron)
        rounded-xl
        p-5
      "
    >
      <div className="flex gap-5">

        <img
          src={item.image}
          alt={item.title}
          className="
            w-28
            h-28
            object-cover
            rounded-lg
          "
        />

        <div className="flex flex-col justify-between">

          <div>

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500">
              {item.brand}
            </p>

            <p className="text-gray-500">
              {item.size}
            </p>

            <p className="font-medium">
              ${item.price}
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => decreaseQuantity(item.id)}
              className="w-8 h-8 border rounded-full hover:bg-gray-100 cursor-pointer"
            >
              -
            </button>

            <span className="font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="w-8 h-8 border rounded-full hover:bg-gray-100 cursor-pointer"
            >
              +
            </button>

          </div>

        </div>

      </div>

      <div className="flex flex-col items-end gap-5">

        <span className="text-xl font-semibold">
          $
          {(
            Number(item.price) *
            item.quantity
          ).toFixed(2)}
        </span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-(--pinkRose) hover:text-(--blackBean) text-2xl cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

      </div>

    </div>
  );
}