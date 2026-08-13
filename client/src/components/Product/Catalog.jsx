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

      const data = await getProducts(
        debouncedSearch,
        selectedCategory
      );

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <main className="mt-22 min-h-[calc(100vh-88px)] max-w-7xl mx-auto p-6">
      <h1 className="mb-8 text-4xl font-clash-bold text-(--orangeBlume)">
        Catálogo
      </h1>

      <div className="flex gap-10">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {loadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
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