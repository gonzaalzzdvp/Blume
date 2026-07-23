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
    <div className="h-[calc(100vh-88px)] w-full flex flex-col justify-center items-center gap-10">
      <h2 className="text-(--orangeBlume) text-4xl uppercase font-bold">
        Nuestros Blumies <span className="font-light">Más vendidos</span>
      </h2>
      <ul className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/product/${product.slug}`}
              className="flex flex-col items-center gap-4 group"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="h-60 w-60 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />

              <div className="w-full flex flex-col gap-1">
                <p className="text-md font-medium">
                  {product.title}
                </p>
                <p className="text-sm">${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
