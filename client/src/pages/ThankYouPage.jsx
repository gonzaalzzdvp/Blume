import { Link, useLocation } from "react-router-dom";

export default function ThankYouPage() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          max-w-xl
          text-center
        "
      >
        <h1
          className="
            text-5xl
            font-semibold
            text-(--citron)
            mb-6
          "
        >
          ¡Gracias por tu pedido!
        </h1>
        {orderNumber && (
          <p
            className="
            mb-8
            text-(--pinkRose)
            font-semibold
            "
          >
            Número de pedido: {orderNumber}
          </p>
        )}

        <p
          className="
            text-lg
            text-gray-600
            mb-8
          "
        >
          Hemos recibido tu solicitud correctamente. Serás redirigido a WhatsApp
          para finalizar la coordinación del pago y la entrega.
        </p>

        <Link
          to="/catalog"
          className="
            inline-flex
            items-center
            justify-center
            px-8
            py-4
            rounded-xl
            bg-(--pinkRose)
            text-white
            hover:bg-(--orangeBlume)
            transition
          "
        >
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}
