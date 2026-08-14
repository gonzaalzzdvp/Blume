import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const footerCategories = [
    { name: "Hidratación", slug: "hidratacion" },
    { name: "Rizos", slug: "rizos" },
    { name: "Violeta", slug: "violeta" },
    { name: "Volumen", slug: "volumen" },
    { name: "Diario", slug: "diario" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/?scrollTo=contact");
    }
  };

  return (
    <footer className="w-full bg-(--blackBean) flex flex-col justify-center items-center z-10">
      {/* Banner CTA Superior */}
      <div className="relative min-h-[70vh] lg:h-[70vh] w-full flex flex-col lg:flex-row justify-between items-center pt-12 px-6 sm:px-12 lg:py-0 lg:px-0 overflow-hidden">
        <img
          src="/footer/footerbgd.png"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="flex flex-col justify-center items-center lg:items-start gap-6 text-(--whiteBlume) text-center lg:text-left lg:pl-16 xl:pl-24 w-full lg:w-1/2 z-10">
          <h4 className="w-full lg:w-[85%] xl:w-[70%] text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Somos tus aliados para que luzcas espectacular
          </h4>
          <p className="w-full lg:w-[85%] xl:w-[70%] text-base sm:text-lg lg:text-xl font-ranade-regular">
            Contáctanos para agendar una cita y conocer más
          </p>
          <div className="w-full lg:w-[85%] xl:w-[70%] mt-2 lg:mt-0">
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-block px-6 py-3 bg-(--whiteBlume) hover:bg-(--blackBean) text-(--blackBean) hover:text-(--whiteBlume) rounded-xl transition-colors text-sm sm:text-base font-medium cursor-pointer">
              ¡Escríbenos!
            </button>
          </div>
        </div>
        <img
          src="/footer/footer.png"
          alt="Footer Banner"
          className="h-80 md:h-110 lg:h-full object-cover object-center mt-8 lg:mt-0 lg:pt-8 lg:pr-8 z-10"
        />
      </div>

      {/* Enlaces de Navegación */}
      <div className="w-full py-12 px-6 sm:px-12 lg:py-0 lg:px-0 lg:h-[30vh] lg:mt-20 bg-(--blackBean) grid grid-cols-2 sm:grid-cols-4 lg:flex lg:justify-center items-start lg:items-center gap-8 sm:gap-12 lg:gap-30 text-(--whiteBlume)">
        <div className="flex flex-col gap-3 sm:gap-5 font-ranade-regular lg:h-60">
          <h4 className="text-base sm:text-lg font-clash-light">Contacto</h4>
          <ul className="text-xs sm:text-sm space-y-2 lg:space-y-1">
            <li>+58 412 611 20 94</li>
            <li className="break-all sm:break-normal">blumecareve@gmail.com</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5 font-ranade-regular lg:h-60">
          <h4 className="text-base sm:text-lg font-clash-light">RRSS</h4>
          <ul className="text-xs sm:text-sm space-y-2 lg:space-y-1">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/blumecareve/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Tiktok
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5 font-ranade-regular lg:h-60">
          <h4 className="text-base sm:text-lg font-clash-light">Tienda</h4>
          <ul className="text-xs sm:text-sm space-y-2 lg:space-y-1">
            {footerCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/catalog?category=${category.slug}`}
                  className="hover:text-(--pinkRose) transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5 font-ranade-regular lg:h-60">
          <h4 className="text-base sm:text-lg font-clash-light">
            Sobre nosotros
          </h4>
          <ul className="text-xs sm:text-sm space-y-2 lg:space-y-1">
            <li>
              <Link
                to="/"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-(--pinkRose) transition-colors"
              >
                Pagos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 lg:py-0 lg:h-10 w-[90%] flex justify-center items-center text-(--whiteBlume) text-xs sm:text-sm font-ranade-regular border-t border-white/20 text-center">
        <p>
          Copyright © 2025, All Rights Reserved - Develop by{" "}
          <span className="font-ranade-bold">GonzaalzzDVP</span>
        </p>
      </div>
    </footer>
  );
}
