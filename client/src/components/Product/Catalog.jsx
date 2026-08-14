import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { getProducts, getCategories } from "../../services/productService";

import ProductCard from "../Product/ProductCard";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton";
import CategorySidebar from "../Category/CategorySidebar";
import SearchBar from "../Search/SearchBar";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || null;

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [search, setSearch] = useState(urlSearch);

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [debouncedSearch, selectedCategory]);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      const data = await getProducts(debouncedSearch, selectedCategory);

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <main className="mt-20 md:mt-24 min-h-[calc(100vh-88px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="mb-6 md:mb-8 text-3xl md:text-4xl font-clash-bold text-(--orangeBlume)">
        Catálogo
      </h1>

      {/* Disposición flex-col en móviles (uno encima del otro) y flex-row a partir de md */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="w-full flex-1">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                No se encontraron productos.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
