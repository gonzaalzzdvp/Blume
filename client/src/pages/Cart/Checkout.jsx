import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

import { createOrder, getOrderChoices } from "../../services/orderService";

import { buildWhatsappMessage } from "../../utils/buildWhatsappMessage";
import { SALES_PHONE } from "../../config/whatsapp";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [choices, setChoices] = useState({
    payment_methods: [],
    shipping_methods: [],
    delivery_zones: [],
    agencies: [],
  });

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
    if (isLoading) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  }

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  useEffect(() => {
    async function loadChoices() {
      try {
        const data = await getOrderChoices();

        setChoices(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadChoices();
  }, []);

  return (
    <main className="min-h-[calc(100vh-88px)] mt-22 max-w-6xl mx-auto p-6">
      <h1 className="text-4xl mb-8 font-clash-light">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* FORMULARIO */}

        <form onSubmit={handleSubmit} className="space-y-5 font-ranade-regular">
          <input
            type="text"
            name="customer_name"
            placeholder="Nombre completo"
            value={formData.customer_name}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              border-b
              border-(--grayBlume)
              p-3
              outline-none
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />

          <input
            type="text"
            name="customer_phone"
            placeholder="Teléfono"
            value={formData.customer_phone}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              border-b
              border-(--grayBlume)
              p-3
              outline-none
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />

          <input
            type="text"
            name="customer_document"
            placeholder="Cédula"
            value={formData.customer_document}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              border-b
              border-(--grayBlume)
              p-3
              outline-none
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />

          {/* Pago */}

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              border-b
              border-(--grayBlume)
              p-3
              outline-none
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            <option value="">Seleccione método de pago</option>

            {choices.payment_methods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>

          {/* Envío */}

          <select
            name="shipping_method"
            value={formData.shipping_method}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              border-b
              border-(--grayBlume)
              p-3
              outline-none
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {choices.shipping_methods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>

          {/* Delivery */}

          {formData.shipping_method === "delivery" && (
            <select
              name="delivery_zone"
              value={formData.delivery_zone}
              onChange={handleChange}
              disabled={isLoading}
              className="
                w-full
                border-b
                border-(--grayBlume)
                p-3
                outline-none
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              <option value="">Seleccione estación</option>

              {choices.delivery_zones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          )}

          {/* Agencia */}

          {formData.shipping_method === "agency" && (
            <select
              name="agency_name"
              value={formData.agency_name}
              onChange={handleChange}
              disabled={isLoading}
              className="
                w-full
                border-b
                border-(--grayBlume)
                p-3
                outline-none
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {choices.agencies.map((agency) => (
                <option key={agency.value} value={agency.value}>
                  {agency.label}
                </option>
              ))}
            </select>
          )}

          {/* Botón */}

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              py-4
              bg-(--citron)
              hover:bg-(--blackBean)
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              text-white
              rounded-xl
              cursor-pointer
              flex
              items-center
              justify-center
              gap-2
              transition-colors
            "
          >
            {isLoading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                  />

                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V1C5.477 1 1 5.477 1 12h3z"
                  />
                </svg>
                Procesando pedido...
              </>
            ) : (
              "Finalizar pedido"
            )}
          </button>
        </form>

        {/* RESUMEN */}

        <div className="p-6 border border-(--grayBlume) rounded-2xl shadow-md font-ranade-regular">
          <h2 className="text-2xl mb-6 font-clash-light">Resumen</h2>

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

          <div className="my-6 border border-(--grayBlume)"></div>

          <div className="flex justify-between text-xl font-ranade-bold">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
