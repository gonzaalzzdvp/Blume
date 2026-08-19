import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/productService";
import "../../Styles/bestSellers.css";

const SLIDE_INTERVAL = 5000;
const TRANSITION_DURATION = 700;

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);

  /*
   * Obtener productos destacados
   */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  /*
   * Productos visibles según pantalla
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
   * Máxima posición posible.
   *
   * Con 9 productos y 4 visibles:
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
   * Autoplay
   */
  useEffect(() => {
    if (isPaused || products.length <= visibleItems) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        /*
         * Al llegar al último desplazamiento,
         * regresamos al primero.
         */
        if (current >= maxIndex) {
          return 0;
        }

        return current + 1;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, products.length, visibleItems, maxIndex]);

  /*
   * Corregir índice al cambiar el tamaño
   * de pantalla.
   */
  useEffect(() => {
    setCurrentIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  /*
   * Navegación manual
   */
  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));

    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  if (!products.length) {
    return null;
  }

  /*
   * Ancho de cada producto dentro del track.
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

      {/* ==========================================
          CONTROLES
          ========================================== */}

      {products.length > visibleItems && (
        <div className="best-sellers__dots">
          {products.slice(0, maxIndex + 1).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir a posición ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
              className={`best-sellers__dot ${
                currentIndex === index ? "best-sellers__dot--active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
