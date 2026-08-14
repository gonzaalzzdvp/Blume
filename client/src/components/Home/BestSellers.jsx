import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/productService";

export default function BestSellers() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="min-h-[calc(100vh-88px)] w-full p-6 lg:p-0 flex flex-col justify-center items-center gap-8 lg:gap-10 py-12 lg:py-0">
      <h2 className="text-(--orangeBlume) text-2xl sm:text-3xl lg:text-4xl uppercase text-center">
        Nuestros Productos <span className="font-clash-bold">Más vendidos</span>
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl">
        {products.map((product) => (
          <li key={product.id} className="flex justify-center">
            <Link
              to={`/product/${product.slug}`}
              className="flex flex-col items-center gap-3 lg:gap-4 group w-full max-w-[160px] sm:max-w-[200px] lg:w-60"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="h-40 w-40 sm:h-48 sm:w-48 lg:h-60 lg:w-60 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />

              <div className="w-full flex flex-col gap-1 text-center lg:text-left">
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
  );
}
