import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import EmptyCart from "../../components/Cart/EmptyCart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <main className="mt-24 min-h-[calc(100vh-88px)] max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-4xl">Carrito</h1>

        <FontAwesomeIcon
          icon={faBagShopping}
          className="text-4xl text-(--orangeBlume)"
        />
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <CartSummary checkoutMode={false} />
        </div>
      )}      
    </main>
  );
}
