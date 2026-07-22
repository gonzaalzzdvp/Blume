import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

import { createOrder } from "../../services/orderService";
import { buildWhatsappMessage } from "../../utils/buildWhatsappMessage";
import { SALES_PHONE } from "../../config/whatsapp";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_document: "",

    payment_method: "",

    shipping_method: "pickup",

    delivery_zone: "",

    agency_name: "mrw",
    agency_address: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const orderData = {
        ...formData,

        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const order = await createOrder(orderData);

      toast.success("Pedido creado correctamente");

      const message = buildWhatsappMessage(order, cartItems);

      const whatsappUrl = `https://wa.me/${SALES_PHONE}?text=${message}`;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1000);

      clearCart();
      navigate("/thank-you", {
        state: {
          orderNumber: order.order_number,
        },
      });
    } catch (error) {
      console.error(error);

      console.log(error.response?.data);

      toast.error("No fue posible crear la orden.");
    }
  }

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  return (
    <main className="min-h-[calc(100vh-88px)] mt-22 max-w-6xl mx-auto p-6">
      <h1 className="text-4xl mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* FORMULARIO */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="customer_name"
            placeholder="Nombre completo"
            value={formData.customer_name}
            onChange={handleChange}
            className="w-full border-b border-(--grayBlume) p-3 outline-none"
          />

          <input
            type="text"
            name="customer_phone"
            placeholder="Teléfono"
            value={formData.customer_phone}
            onChange={handleChange}
            className="w-full border-b border-(--grayBlume) p-3 outline-none"
          />

          <input
            type="text"
            name="customer_document"
            placeholder="Cédula"
            value={formData.customer_document}
            onChange={handleChange}
            className="w-full border-b border-(--grayBlume) p-3 outline-none"
          />

          {/* Pago */}

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full border-b border-(--grayBlume) p-3 outline-none"
          >
            <option value="">
              Seleccione método de pago
            </option>

            <option value="usdt">USDT</option>

            <option value="zelle">Zelle</option>

            <option value="zinli">Zinli</option>

            <option value="paypal">PayPal</option>

            <option value="transfer">Transferencia</option>

            <option value="pago_movil">Pago móvil</option>

            <option value="cash">Efectivo</option>
          </select>

          {/* Envío */}

          <select
            name="shipping_method"
            value={formData.shipping_method}
            onChange={handleChange}
            className="w-full border-b border-(--grayBlume) p-3 outline-none"
          >
            <option value="pickup">Pick-up</option>

            <option value="delivery">Delivery Metro Caracas</option>

            <option value="agency">MRW</option>
          </select>

          {formData.shipping_method === "delivery" && (
            <select
              name="delivery_zone"
              value={formData.delivery_zone}
              onChange={handleChange}
              className="w-full border-b border-(--grayBlume) p-3 outline-none"
            >
              <option value="">Seleccione estación</option>

              <option value="petare">Petare</option>

              <option value="los_cortijos">Los Cortijos</option>

              <option value="chacao">Chacao</option>

              <option value="altamira">Altamira</option>

              <option value="plaza_venezuela">Plaza Venezuela</option>
            </select>
          )}

          {formData.shipping_method === "agency" && (
            <input
              type="text"
              name="agency_address"
              placeholder="Sucursal MRW"
              value={formData.agency_address}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
          )}

          <button
            type="submit"
            className="
              w-full
              py-4
              bg-(--pinkRose)
              hover:bg-(--citron)
              text-white
              rounded-xl
              cursor-pointer
            "
          >
            Finalizar pedido
          </button>
        </form>

        {/* RESUMEN */}

        <div className="p-6 border border-(--grayBlume) rounded-2xl shadow-md">
          <h2 className="text-2xl mb-6">Resumen</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.title} x{item.quantity}
                </span>

                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="my-6 border border-(--grayBlume)" ></div>

          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
