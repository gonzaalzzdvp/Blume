import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/productService";
import { useLoading } from "../../context/LoadingContext";

import "../../Styles/bestSellers.css";

const SLIDE_INTERVAL = 5000;
const TRANSITION_DURATION = 700;
const SWIPE_THRESHOLD = 50;

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);

  const { completeTask } = useLoading();

  const isAnimatingRef = useRef(false);
  const wheelLocked = useRef(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        completeTask("featuredProducts");
      }
    }

    loadProducts();
  }, [completeTask]);

  /*
   * ==========================================
   * PRODUCTOS VISIBLES
   * ==========================================
   */

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    updateVisibleItems();

    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  /*
   * ==========================================
   * MÁXIMO ÍNDICE
   * ==========================================
   *
   * 9 productos / 4 visibles:
   *
   * 0 → 1 2 3 4
   * 1 → 2 3 4 5
   * 2 → 3 4 5 6
   * 3 → 4 5 6 7
   * 4 → 5 6 7 8
   * 5 → 6 7 8 9
   */

  const maxIndex = Math.max(products.length - visibleItems, 0);

  /*
   * ==========================================
   * AUTOPLAY
   * ==========================================
   */

  useEffect(() => {
    if (isPaused || products.length <= visibleItems) {
      return;
    }

    const interval = setInterval(() => {
      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;

      setCurrentIndex((current) => {
        if (current >= maxIndex) {
          return 0;
        }

        return current + 1;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, products.length, visibleItems, maxIndex]);

  /*
   * ==========================================
   * AJUSTAR ÍNDICE
   * ==========================================
   */

  useEffect(() => {
    setCurrentIndex((current) => Math.min(current, maxIndex));

    isAnimatingRef.current = false;
  }, [maxIndex]);

  /*
   * ==========================================
   * SIGUIENTE / ANTERIOR
   * ==========================================
   */

  const nextSlide = () => {
    if (isAnimatingRef.current || products.length <= visibleItems) {
      return;
    }

    isAnimatingRef.current = true;

    setCurrentIndex((current) => {
      if (current >= maxIndex) {
        return 0;
      }

      return current + 1;
    });
  };

  const previousSlide = () => {
    if (isAnimatingRef.current || products.length <= visibleItems) {
      return;
    }

    isAnimatingRef.current = true;

    setCurrentIndex((current) => {
      if (current <= 0) {
        return maxIndex;
      }

      return current - 1;
    });
  };

  /*
   * ==========================================
   * TRANSICIÓN TERMINADA
   * ==========================================
   */

  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;
  };

  /*
   * ==========================================
   * DOTS
   * ==========================================
   */

  const goToSlide = (index) => {
    if (isAnimatingRef.current) {
      return;
    }

    setCurrentIndex(Math.min(index, maxIndex));

    isAnimatingRef.current = true;

    /*
     * Pausa breve después de la interacción
     * manual para no competir con el autoplay.
     */
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  /*
   * ==========================================
   * SCROLL / WHEEL
   * ==========================================
   */

  const handleWheel = (event) => {
    if (products.length <= visibleItems || wheelLocked.current) {
      return;
    }

    /*
     * Determinamos si el usuario está haciendo
     * scroll horizontal o vertical.
     *
     * Si el movimiento horizontal es mayor,
     * usamos deltaX.
     */
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    /*
     * Ignoramos movimientos mínimos del trackpad.
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
     * Un gesto = un producto.
     */
    setTimeout(() => {
      wheelLocked.current = false;
    }, TRANSITION_DURATION);
  };

  /*
   * ==========================================
   * TOUCH START
   * ==========================================
   */

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  /*
   * ==========================================
   * TOUCH END
   * ==========================================
   */

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;

    const deltaY = touch.clientY - touchStartY.current;

    /*
     * Limpiar referencias.
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
     * El swipe debe superar el umbral.
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
   * RENDER
   * ==========================================
   */

  if (!products.length) {
    return null;
  }

  /*
   * Cada producto ocupa una fracción del track.
   */
  const slideWidth = 100 / products.length;

  /*
   * Movimiento de un producto.
   */
  const translateX = currentIndex * slideWidth;

  return (
    <section
      className="best-sellers"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-(--orangeBlume) text-2xl sm:text-3xl lg:text-4xl uppercase text-center">
        Nuestros Productos <span className="font-clash-bold">Más vendidos</span>
      </h2>

      <div className="best-sellers__viewport">
        <ul
          className="best-sellers__track"
          style={{
            width: `${(products.length / visibleItems) * 100}%`,
            transform: `translateX(-${translateX}%)`,
            transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="best-sellers__slide"
              style={{
                width: `${slideWidth}%`,
              }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="best-sellers__product group"
              >
                <img
                  src={product.image_url}
                  alt={product.title}
                  draggable="false"
                  className="
                    best-sellers__image
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                <div className="best-sellers__info">
                  <p className="text-sm lg:text-md font-ranade-regular line-clamp-2">
                    {product.title}
                  </p>

                  <p className="text-xs lg:text-sm font-ranade-bold text-(--orangeBlume)">
                    ${product.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Controles inferiores */}
      {products.length > visibleItems && (
        <div className="best-sellers__dots">
          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir a posición ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
              className={`
                best-sellers__dot
                ${currentIndex === index ? "best-sellers__dot--active" : ""}
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}
