import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import ProductTable from "../../components/Product/ProductTable";
import SearchBar from "../../components/Common/Searchbar";
import ConfirmModal from "../../components/Common/ConfirmModal";
import { getProducts, deleteProduct } from "../../services/adminProductService";

import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [debouncedSearch]);

  const loadProducts = async () => {
    try {
      const data = await getProducts({
        search: debouncedSearch,
      });

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);

    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeleting(true);

      await deleteProduct(selectedProduct.id);

      toast.success("Producto eliminado.");

      loadProducts();

      setShowDeleteModal(false);

      setSelectedProduct(null);
    } catch (error) {
      toast.error("No fue posible eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Administra el catálogo de la tienda.
        </p>
      </div>

      {/* SEARCH + NEW PRODUCT */}
      <div
        className="
          pb-6 sm:pb-10
          px-0 sm:px-5
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
        "
      >
        <div className="w-full sm:flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar productos..."
          />
        </div>

        <Link
          to="/admin/products/new"
          className="
            w-full
            sm:w-auto
            flex
            justify-center
            items-center
            bg-(--pinkRose)
            text-white
            px-5
            py-3
            rounded-xl
            hover:opacity-90
            cursor-pointer
            whitespace-nowrap
          "
        >
          + Nuevo producto
        </Link>
      </div>

      <ProductTable products={products} onDelete={handleDelete} />

      <ConfirmModal
        open={showDeleteModal}
        title="Eliminar producto"
        message={`¿Seguro que deseas eliminar "${selectedProduct?.title}"? Esta acción no se puede deshacer.`}
        loading={deleting}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
