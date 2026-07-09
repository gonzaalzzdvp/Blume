import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addToCart as addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartService,
} from "../services/cartService";

import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { authenticated } = useAuth();

  const loadCart = async () => {
    try {
      const data = await getCart();

      setCartItems(data.items);

      setCartTotal(Number(data.total));

      setCartCount(data.total_items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadCart();
    } else {
      resetCart();
      setLoading(false);
    }
  }, [authenticated]);

  const addToCart = async (product, quantity = 1) => {
    try {
      const data = await addCartItem(product.id, quantity);

      setCartItems(data.items);

      setCartTotal(Number(data.total));

      setCartCount(data.total_items);

      toast.success(`${product.title} agregado al carrito`);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "No fue posible agregar el producto.",
      );
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const data = await removeCartItem(cartItemId);

      setCartItems(data.items);

      setCartTotal(Number(data.total));

      setCartCount(data.total_items);

      toast.success("Producto eliminado");
    } catch (error) {
      toast.error("No fue posible eliminar el producto.");
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const data = await updateCartItem(cartItemId, quantity);

      setCartItems(data.items);

      setCartTotal(Number(data.total));

      setCartCount(data.total_items);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "No fue posible actualizar el carrito.",
      );
    }
  };

  const increaseQuantity = (cartItemId) => {
    const item = cartItems.find((item) => item.id === cartItemId);

    if (!item) return;

    updateQuantity(cartItemId, item.quantity + 1);
  };

  const decreaseQuantity = (cartItemId) => {
    const item = cartItems.find((item) => item.id === cartItemId);

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(cartItemId);
      return;
    }

    updateQuantity(cartItemId, item.quantity - 1);
  };

  const clearCart = async () => {
    try {
      const data = await clearCartService();

      setCartItems(data.items);

      setCartTotal(Number(data.total));

      setCartCount(data.total_items);

      toast.success("Carrito vaciado");
    } catch (error) {
      toast.error("No fue posible vaciar el carrito.");
    }
  };

  const resetCart = () => {
    setCartItems([]);
    setCartTotal(0);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        loading,
        loadCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
