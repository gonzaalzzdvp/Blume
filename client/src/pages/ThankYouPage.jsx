import { Link, useLocation } from "react-router-dom";

export default function ThankYouPage() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;

  return (
    <main
      className="
        min-h-[calc(100vh-80px)]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-12
      "
    >
      <div
        className="
          w-full
          max-w-xl
          text-center
          bg-white
          p-6
          sm:p-8
          rounded-2xl
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-clash-bold
            text-(--citron)
            mb-3
            sm:mb-6
            leading-tight
          "
        >
          ¡Gracias por tu pedido!
        </h1>

        {orderNumber && (
          <p
            className="
              mb-6
              sm:mb-8
              text-base
              sm:text-lg
              text-(--pinkRose)
              font-semibold
            "
          >
            Número de pedido: <span className="font-bold">{orderNumber}</span>
          </p>
        )}

        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-gray-600
            mb-6
            sm:mb-8
            font-ranade-regular
            leading-relaxed
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
            w-full
            sm:w-auto
            px-6
            sm:px-8
            py-3.5
            sm:py-4
            rounded-xl
            bg-(--pinkRose)
            text-white
            hover:bg-(--orangeBlume)
            font-medium
            text-base
            sm:text-lg
            transition-colors
            duration-200
            shadow-sm
          "
        >
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}
