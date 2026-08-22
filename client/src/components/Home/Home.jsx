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
    tablet: "/Home/banner-b2.png",
    mobile: "/Home/banner-b3.png",
    alt: "Banner promocional",
  },
  {
    desktop: "/Home/banner-c.png",
    tablet: "/Home/banner-c2.png",
    mobile: "/Home/banner-c3.png",
    alt: "Banner de productos",
  },
];

const SLIDE_INTERVAL = 4500;
const TRANSITION_DURATION = 800;
const SWIPE_THRESHOLD = 50;

function BannerImage({ banner }) {
  return (
    <picture className="home-banner__picture">
      <source media="(min-width: 1024px)" srcSet={banner.desktop} />

      <source media="(min-width: 768px)" srcSet={banner.tablet} />

      <img
        src={banner.mobile}
        alt={banner.alt}
        className="home-banner__image"
        loading="eager"
        draggable="false"
      />
    </picture>
  );
}

export default function Home() {
  /*
   * Carrusel infinito:
   *
   * C | A | B | C | A
   * ↑               ↑
   * clon            clon
   */
  const slides = [banners[banners.length - 1], ...banners, banners[0]];

  /*
   * A = 1
   * B = 2
   * C = 3
   */
  const [currentIndex, setCurrentIndex] = useState(1);

  const [isTransitioning, setIsTransitioning] = useState(true);

  const [isPaused, setIsPaused] = useState(false);

  /*
   * Referencia para evitar múltiples movimientos
   * mientras una transición está ocurriendo.
   */
  const isAnimatingRef = useRef(false);

  /*
   * Touch
   */
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /*
   * Wheel
   */
  const wheelLocked = useRef(false);

  /*
   * ==========================================
   * PAUSAR CUANDO LA PESTAÑA NO ESTÁ VISIBLE
   * ==========================================
   */

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  /*
   * ==========================================
   * AUTOPLAY
   * ==========================================
   */

  useEffect(() => {
    if (isPaused || document.hidden) {
      return;
    }

    const interval = setInterval(() => {
      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;

      setCurrentIndex((current) => current + 1);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  /*
   * ==========================================
   * NAVEGACIÓN
   * ==========================================
   */

  const nextSlide = () => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setCurrentIndex((current) => current + 1);
  };

  const previousSlide = () => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setCurrentIndex((current) => current - 1);
  };

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
      setIsTransitioning(false);

      setCurrentIndex(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isAnimatingRef.current = false;
        });
      });

      return;
    }

    /*
     * Llegamos al clon de C.
     *
     * C | A | B | C | A
     * ↑
     */
    if (currentIndex === 0) {
      setIsTransitioning(false);

      setCurrentIndex(banners.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isAnimatingRef.current = false;
        });
      });

      return;
    }

    /*
     * Transición normal terminada.
     */
    isAnimatingRef.current = false;
  };

  /*
   * ==========================================
   * DOTS
   * ==========================================
   */

  const goToBanner = (index) => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;

    setCurrentIndex(index + 1);

    /*
     * Pausa breve para que el usuario pueda
     * interactuar sin que el autoplay compita
     * inmediatamente con el clic.
     */
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  /*
   * ==========================================
   * WHEEL / TRACKPAD
   * ==========================================
   */

  const handleWheel = (event) => {
    /*
     * Evitamos que pequeños movimientos del trackpad
     * disparen varias imágenes seguidas.
     */
    if (wheelLocked.current) {
      return;
    }

    /*
     * Solo nos interesa el movimiento vertical u
     * horizontal más significativo.
     */
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    /*
     * Si el movimiento es demasiado pequeño,
     * no hacemos nada.
     */
    if (Math.abs(delta) < 20) {
      return;
    }

    wheelLocked.current = true;

    if (delta > 0) {
      nextSlide();
    } else {
      previousSlide();
    }

    /*
     * Pequeño bloqueo para que un solo gesto
     * del trackpad corresponda a un banner.
     */
    setTimeout(() => {
      wheelLocked.current = false;
    }, TRANSITION_DURATION);
  };

  /*
   * ==========================================
   * TOUCH
   * ==========================================
   */

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;

    const deltaY = touch.clientY - touchStartY.current;

    /*
     * Limpiamos referencias.
     */
    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Si el movimiento vertical es mayor,
     * dejamos que la página haga scroll normalmente.
     */
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    /*
     * El swipe debe superar cierto umbral.
     */
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  /*
   * ==========================================
   * ÍNDICE DEL DOT ACTIVO
   * ==========================================
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
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
              <BannerImage banner={banner} />
            </div>
          ))}
        </div>
      </Link>

      {/* Controles inferiores */}
      <div className="home-banner__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`home-banner__dot ${
              activeDot === index ? "home-banner__dot--active" : ""
            }`}
            onClick={(event) => {
              /*
               * Evita que el click del dot
               * navegue al catálogo.
               */
              event.preventDefault();
              event.stopPropagation();

              goToBanner(index);
            }}
            aria-label={`Ir al banner ${index + 1}`}
            aria-current={activeDot === index ? "true" : undefined}
          />
        ))}
      </div>
    </header>
  );
}
