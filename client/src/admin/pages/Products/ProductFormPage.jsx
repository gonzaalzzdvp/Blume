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
  const [images, setImages] = useState([]);

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
    } catch (err) {
      toast.error("No se pudo cargar el producto");
    }
  }

  async function handleSubmit(formData) {
    try {
      setLoading(true);

      if (editing) {
        await updateProduct(id, formData);

        toast.success("Producto actualizado");
      } else {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (images.length > 0) {
          formData.append("image", images[0]);

          images.slice(1).forEach((image) => {
            formData.append("gallery_images", image);
          });
        }

        await createProduct(formData);

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

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      loading={loading}
      onSubmit={handleSubmit}
      images={images}
      setImages={setImages}
    />
  );
}
