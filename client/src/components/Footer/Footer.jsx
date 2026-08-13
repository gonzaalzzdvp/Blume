import { Link } from "react-router-dom";

export default function Footer() {
  const footerCategories = [
    { name: "Hidratación", slug: "hidratacion" },
    { name: "Rizos", slug: "rizos" },
    { name: "Violeta", slug: "violeta" },
    { name: "Volumen", slug: "volumen" },
    { name: "Diario", slug: "diario" },
  ];

  return (
    <div className="w-full bg-(--blackBean) flex flex-col justify-center items-center z-10">
      <div className="h-[70vh] w-full bg-(--pinkRose) flex justify-between items-center ">
        <div className="flex flex-col justify-start items-center gap-6 text-(--whiteBlume)">
          <h4 className="w-[70%] text-5xl">
            Somos tus aliados para que luzcas espectacular
          </h4>
          <p className="w-[70%] text-xl font-ranade-regular">
            Contáctanos para agendar una cita y conocer más
          </p>
          <div className="w-[70%]">
            <a href="#contact" className="px-4 py-3 bg-(--whiteBlume) hover:bg-(--blackBean) text-(--blackBean) hover:text-(--whiteBlume) rounded-xl">
              ¡Escríbenos!
            </a>
          </div>
        </div>
        <img src="/footer/footer.png" className="h-full" />
      </div>
      <div className="h-[30vh] mt-20 bg-(--blackBean) flex justify-center items-center gap-30 text-(--whiteBlume)">
        <div className="h-60 flex flex-col gap-5 font-ranade-regular">
          <h4 className="text-lg">Contacto</h4>
          <ul className="text-sm">
            <li>
                +58 412 611 20 94
            </li>
            <li>
                blumecareve@gmail.com
            </li>
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5 font-ranade-regular">
          <h4 className="text-lg">RRSS</h4>
          <ul className="text-sm">
            <li>
              <Link to="/https://www.facebook.com" className="hover:text-(--pinkRose)">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/blumecareve/" className="hover:text-(--pinkRose)">
                Instagram
              </Link>
            </li>
            <li>
              <Link to="/https://www.tiktok.com" className="hover:text-(--pinkRose)">
                Tiktok
              </Link>
            </li>
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5 font-ranade-regular">
          <h4 className="text-lg">Tienda</h4>
          <ul className="text-sm">
            {footerCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/catalog?category=${category.slug}`}
                  className="hover:text-(--pinkRose)"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5 font-ranade-regular">
          <h4 className="text-lg">Sobre nosotros</h4>
          <ul className="text-sm">
            <li>
              <Link to="/" className="hover:text-(--pinkRose)">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-(--pinkRose)">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-(--pinkRose)">
                Pagos
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-10 w-[90%] flex justify-center items-center text-(--whiteBlume) text-sm font-ranade-regular border-t">
        <p>Copyright © 2025, All Rights Reserved - Develop by <span className="font-ranade-bold">GonzaalzzDVP</span></p>
      </div>
    </div>
  );
}
