import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { useLoading } from "../../context/LoadingContext";

export default function CatalogSection() {
  const [categories, setCategories] = useState([]);
  const { completeTask } = useLoading();

  const categoryImages = {
    hidratacion: "/categories/hydrating.png",
    diario: "/categories/daily.png",
    volumen: "/categories/volume.png",
    rizos: "/categories/curls.png",
    violeta: "/categories/blonde.png",
  };

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
      completeTask("categories");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="min-h-[calc(100vh-88px)] w-full p-6 lg:p-20 flex flex-col justify-center items-center py-12 lg:py-0">
      <div className="w-full text-center mb-8">
        <h2 className="text-(--blackBean) text-2xl sm:text-3xl lg:text-4xl uppercase">
          Comprar por <span className="font-clash-bold">categoría</span>
        </h2>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-6 lg:gap-4">
        {categories.map((category) => (
          <Link
            to={`/catalog?category=${category.slug}`}
            key={category.id}
            className="flex flex-col justify-center items-center gap-3 lg:gap-4 cursor-pointer group"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-45 lg:h-45 rounded-full overflow-hidden">
              <img
                src={categoryImages[category.slug]}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="text-center text-sm lg:text-base font-ranade-bold text-(--citron)">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
