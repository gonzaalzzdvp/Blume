import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

export default function CatalogSection() {
  const [categories, setCategories] = useState([]);

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="h-[calc(100vh-88px)] w-full p-6 md:p-20 flex flex-col justify-center items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-(--blackBean) text-4xl uppercase">
          <span className="font-bold">Comprar por</span> categoría
        </h2>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-4">
        {categories.map((category) => (
          <Link
            to={`/catalog?category=${category.slug}`}
            key={category.id}
            className="flex flex-col justify-center items-center gap-4 cursor-pointer group"
          >
            <div className="w-full h-45 rounded-full overflow-hidden">
              <img
                src={categoryImages[category.slug]}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <p className="text-center font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
