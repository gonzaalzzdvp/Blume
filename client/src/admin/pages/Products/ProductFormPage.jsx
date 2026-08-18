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

  /*
  |--------------------------------------------------------------------------
  | CARGAR DATOS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadCategories();

    if (editing) {
      loadProduct();
    }
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | CATEGORÍAS
  |--------------------------------------------------------------------------
  */

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PRODUCTO
  |--------------------------------------------------------------------------
  */

  async function loadProduct() {
    try {
      const data = await getProduct(id);

      setProduct(data);

      /*
      |------------------------------------------------------------
      | Las imágenes existentes llegan ordenadas desde backend.
      |------------------------------------------------------------
      */

      const images = (data.images || [])
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((img, index) => ({
          ...img,
          isMain: index === 0,
        }));

      setExistingImages(images);

      /*
      |------------------------------------------------------------
      | IMPORTANTE:
      |
      | imageOrder utiliza IDs con el mismo formato que
      | ImageUploader:
      |
      | existing:1
      | existing:5
      | existing:8
      |------------------------------------------------------------
      */

      setImageOrder(images.map((img) => `existing:${img.id}`));
    } catch (err) {
      console.error(err);

      toast.error("No se pudo cargar el producto");
    }
  }

  /*
  |--------------------------------------------------------------------------
  | GUARDAR PRODUCTO
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(data) {
    try {
      setLoading(true);

      const form = new FormData();

      /*
      |------------------------------------------------------------
      | CAMPOS DEL PRODUCTO
      |------------------------------------------------------------
      */

      Object.entries(data).forEach(([key, value]) => {
        /*
          | React Hook Form puede enviar undefined/null.
          | No queremos mandar esos valores como strings.
          */

        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      /*
      |--------------------------------------------------------------------------
      | IMÁGENES NUEVAS
      |--------------------------------------------------------------------------
      |
      | Todas las imágenes nuevas se mandan como gallery_images.
      |
      | Ya NO usamos:
      |
      | form.set("image", newImages[0])
      |
      | porque eso hacía que la primera imagen nueva se manejara
      | de forma diferente al resto.
      |
      */

      newImages.forEach((item) => {
        form.append("gallery_images", item.file);
      });

      form.append(
        "gallery_image_keys",
        JSON.stringify(newImages.map((item) => item.id)),
      );

      /*
      |--------------------------------------------------------------------------
      | IMÁGENES ELIMINADAS
      |--------------------------------------------------------------------------
      */

      deletedImages.forEach((imageId) => {
        form.append("deleted_images", JSON.stringify(deletedImages));
      });

      /*
      |--------------------------------------------------------------------------
      | ORDEN FINAL
      |--------------------------------------------------------------------------
      |
      | Ejemplo:
      |
      | existing:12
      | new:abc123
      | existing:7
      | new:def456
      |
      */

      imageOrder.forEach((orderItem) => {
        form.append("image_order", JSON.stringify(imageOrder));
      });

      /*
      |--------------------------------------------------------------------------
      | DEBUG TEMPORAL
      |--------------------------------------------------------------------------
      |
      | Puedes dejar esto mientras probamos.
      | Luego lo quitamos.
      |
      */

      console.log("IMAGE ORDER:", imageOrder);

      console.log("NEW IMAGES:", newImages);

      /*
      |--------------------------------------------------------------------------
      | REQUEST
      |--------------------------------------------------------------------------
      */

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

      console.log("BACKEND ERROR:", error.response?.data);

      toast.error("No fue posible guardar el producto.");
    } finally {
      setLoading(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CANCELAR
  |--------------------------------------------------------------------------
  */

  function handleCancel() {
    navigate("/admin/products");
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

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
