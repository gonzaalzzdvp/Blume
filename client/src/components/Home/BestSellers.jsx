import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/productService";
import "../../Styles/BestSellers.css";

const SLIDE_INTERVAL = 5000;
const TRANSITION_DURATION = 700;

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  /*
   * Determina cuántos productos se muestran
   * dependiendo del tamaño de pantalla.
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
   * Cantidad máxima de posiciones que puede recorrer
   * el carrusel.
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
        if (current >= maxIndex) {
          return 0;
        }

        return current + 1;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, products.length, visibleItems, maxIndex]);

  /*
   * Ajustamos el índice cuando cambia el tamaño
   * de pantalla.
   */
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  /*
   * Navegación mediante los puntos.
   */
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  /*
   * Si no hay productos, no renderizamos la sección.
   */
  if (!products.length) {
    return null;
  }

  /*
   * Cantidad de posiciones disponibles.
   */
  const slideCount = maxIndex + 1;

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
            transform: `translateX(-${
              currentIndex * (100 / products.length)
            }%)`,
            transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="best-sellers__slide"
              style={{
                width: `${100 / products.length}%`,
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

      {/* Controles */}
      {slideCount > 1 && (
        <div className="best-sellers__dots">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir a productos ${index + 1}`}
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
