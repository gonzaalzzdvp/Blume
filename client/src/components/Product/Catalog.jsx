import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/productService";

import ProductCard from "../Product/ProductCard";
import CategorySidebar from "../Category/CategorySidebar";
import SearchBar from "../Search/SearchBar";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
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
      const data = await getProducts(debouncedSearch, selectedCategory);

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mt-22 min-h-[calc(100vh-88px)] max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Catálogo</h1>

      <div className="flex gap-10">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex-1">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
