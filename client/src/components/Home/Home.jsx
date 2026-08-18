import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/home.css";

const banners = [
  {
    desktop: "/Home/banner-a.png",
    tablet: "/Home/banner-a2.png",
    mobile: "/Home/banner-a3.png",
    alt: "Banner principal",
  },
  {
    desktop: "/Home/banner-b.png",
    tablet: "/Home/banner-a2.png",
    mobile: "/Home/banner-a3.png",
    alt: "Banner promocional",
  },
  {
    desktop: "/Home/banner-a.png",
    tablet: "/Home/banner-a2.png",
    mobile: "/Home/banner-a3.png",
    alt: "Banner de productos",
  },
];

const SLIDE_INTERVAL = 4500;
const TRANSITION_DURATION = 800;

function BannerImage({ banner, priority = false }) {
  return (
    <picture className="home-banner__picture">
      <source media="(min-width: 1024px)" srcSet={banner.desktop} />

      <source media="(min-width: 768px)" srcSet={banner.tablet} />

      <img
        src={banner.mobile}
        alt={banner.alt}
        className="home-banner__image"
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}

export default function Home() {
  /*
   * Agregamos clones al principio y al final:
   *
   * C | A | B | C | A
   * ↑               ↑
   * clon            clon
   */
  const slides = [banners[banners.length - 1], ...banners, banners[0]];

  /*
   * Empezamos en 1 porque la posición 0 es el clon de C.
   */
  const [currentIndex, setCurrentIndex] = useState(1);

  /*
   * Controla si el carrusel está animando.
   */
  const [isTransitioning, setIsTransitioning] = useState(true);

  /*
   * Pausa el autoplay cuando el usuario pasa el mouse.
   */
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Evita que el efecto de autoplay se ejecute
   * mientras hacemos el reposicionamiento invisible.
   */
  const isResetting = useRef(false);

  /*
   * ==========================================
   * AUTOPLAY
   * ==========================================
   */

  useEffect(() => {
    if (isPaused || isResetting.current) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => current + 1);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  /*
   * ==========================================
   * LOOP INFINITO
   * ==========================================
   */

  const handleTransitionEnd = () => {
    /*
     * Llegamos al clon de A.
     *
     * C | A | B | C | A
     *                 ↑
     */
    if (currentIndex === slides.length - 1) {
      isResetting.current = true;

      /*
       * Quitamos la transición.
       */
      setIsTransitioning(false);

      /*
       * Movemos instantáneamente al A original.
       */
      setCurrentIndex(1);

      /*
       * Esperamos un frame para volver a activar
       * la transición.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isResetting.current = false;
        });
      });
    }

    /*
     * Si en algún momento navegamos hacia atrás
     * hasta el clon de C.
     */
    if (currentIndex === 0) {
      isResetting.current = true;

      setIsTransitioning(false);
      setCurrentIndex(banners.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isResetting.current = false;
        });
      });
    }
  };

  /*
   * ==========================================
   * CONTROLES
   * ==========================================
   */

  const goToBanner = (index) => {
    /*
     * Los índices reales son:
     *
     * A = 1
     * B = 2
     * C = 3
     */
    setCurrentIndex(index + 1);

    /*
     * Reiniciamos el ciclo del autoplay.
     */
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  /*
   * Índice visual para saber qué punto activar.
   *
   * currentIndex:
   * 1 → A
   * 2 → B
   * 3 → C
   * 4 → A(clon)
   */
  const activeDot =
    currentIndex === 0
      ? banners.length - 1
      : currentIndex === slides.length - 1
        ? 0
        : currentIndex - 1;

  return (
    <header
      className="home-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link to="/catalog" className="home-banner__link">
        <div
          className="home-banner__track"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
            transition: isTransitioning
              ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((banner, index) => (
            <div
              className="home-banner__slide"
              key={`${banner.desktop}-${index}`}
              style={{
                width: `${100 / slides.length}%`,
              }}
            >
              <BannerImage banner={banner} priority={index <= 1} />
            </div>
          ))}
        </div>
      </Link>

      {/* ==========================================
          CONTROLES INFERIORES
          ========================================== */}

      <div className="home-banner__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`home-banner__dot ${
              activeDot === index ? "home-banner__dot--active" : ""
            }`}
            onClick={() => goToBanner(index)}
            aria-label={`Ir al banner ${index + 1}`}
            aria-current={activeDot === index ? "true" : undefined}
          />
        ))}
      </div>
    </header>
  );
}
