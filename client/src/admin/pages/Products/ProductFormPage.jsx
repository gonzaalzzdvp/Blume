import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/Product/ProductForm";
import {
  createProduct,
  updateProduct,
  getProduct,
  getCategories,
} from "../../services/adminProductService";

import toast from "react-hot-toast";

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imageOrder, setImageOrder] = useState([]);

  useEffect(() => {
    loadCategories();

    if (editing) {
      loadProduct();
    }
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadProduct() {
    try {
      const data = await getProduct(id);

      setProduct(data);

      const images = (data.images || [])
        .sort((a, b) => a.position - b.position)
        .map((img, index) => ({
          ...img,
          isMain: index === 0,
        }));

      setExistingImages(images);

      setImageOrder(images.map((img) => img.id));
    } catch (err) {
      console.error(err);
      toast.error("No se pudo cargar el producto");
    }
  }

  async function handleSubmit(data) {
    try {
      setLoading(true);

      const form = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value);
      });

      if (newImages.length > 0) {
        form.set("image", newImages[0]);

        newImages.slice(1).forEach((image) => {
          form.append("gallery_images", image);
        });
      }

      deletedImages.forEach((id) => {
        form.append("deleted_images", id);
      });

      imageOrder.forEach((id) => {
        form.append("image_order", id);
      });

      if (editing) {
        await updateProduct(id, form);

        toast.success("Producto actualizado");
      } else {
        await createProduct(form);

        toast.success("Producto creado");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      toast.error("No fue posible guardar el producto.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/admin/products");
  }

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      existingImages={existingImages}
      setExistingImages={setExistingImages}
      newImages={newImages}
      setNewImages={setNewImages}
      deletedImages={deletedImages}
      setDeletedImages={setDeletedImages}
      imageOrder={imageOrder}
      setImageOrder={setImageOrder}
    />
  );
}
