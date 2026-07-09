import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import ProductTable from "../../components/Product/ProductTable";
import SearchBar from "../../components/Common/SearchBar";
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
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Productos</h1>

        <p className="text-gray-500">Administra el catálogo de la tienda.</p>
      </div>

      <div className="pb-10 flex justify-between items-center gap-6">
        <div className="ml-5 flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar productos..."
          />
        </div>

        <Link
          to="/admin/products/new"
          className="
            bg-(--pinkRose)
            text-white
            mr-5
            px-6
            py-3
            rounded-xl
            hover:opacity-90
            cursor-pointer
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
