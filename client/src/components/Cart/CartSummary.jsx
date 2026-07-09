import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const {
    cartTotal,
    clearCart,
  } = useCart();

  return (
    <div
      className="
        mt-8
        border-t
        pt-6
        flex
        justify-between
        items-center
      "
    >
      <button
        onClick={clearCart}
        className="
          border
          px-5
          py-3
          rounded-lg
          hover:bg-gray-100
          cursor-pointer
        "
      >
        Vaciar carrito
      </button>

      <div className="text-right">

        <p className="text-gray-500">
          Total
        </p>

        <h2 className="text-3xl font-bold">
          ${cartTotal.toFixed(2)}
        </h2>

      </div>

    </div>
  );
}