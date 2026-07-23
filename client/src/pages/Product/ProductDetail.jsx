import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { getProduct } from "../../services/productService";

import Ingredients from "../../components/Ingredients/Ingredients";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(slug);
      setProduct(data);
      setSelectedImage(data.image_url);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div className="p-8">Cargando producto...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-88px)] mt-22 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-20">
          {/* --- SECCIÓN DE IMÁGENES --- */}
          <div className="flex justify-center items-center gap-20">
            {/* Columna Izquierda: Miniaturas */}
            <div className="flex flex-col gap-3">
              <img
                src={product.image_url}
                alt={product.title}
                onClick={() => setSelectedImage(product.image_url)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border transition-colors ${
                  selectedImage === product.image_url
                    ? "border-(--blackBean)" // Borde si está seleccionada
                    : "border-transparent hover:border-(--citron)" // Transparente por defecto, color en hover
                }`}
              />

              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={img.alt_text}
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border transition-colors ${
                    selectedImage === img.image
                      ? "border-(--blackBean)"
                      : "border-transparent hover:border-(--citron)"
                  }`}
                />
              ))}
            </div>

            {/* Imagen Principal Seleccionada */}
            <div className="w-80">
              <img
                src={selectedImage}
                alt={product.title}
                // Borde eliminado como solicitaste
                className="h-80 w-80 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* --- SECCIÓN DE INFORMACIÓN --- */}
          <div className="w-112.5 flex flex-col">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <div
                className={`w-20 p-1 flex justify-center items-center gap-1 rounded-2xl ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800 "
                    : "bg-red-300 text-red-800 p-1 rounded-2xl"
                }`}
              >
                <span
                  className={`w-2 h-2  rounded-2xl ${
                    product.stock > 0 ? "bg-green-800" : "bg-red-800"
                  }`}
                ></span>
                <p className="text-[12px] flex items-center justify-center ">
                  {" "}
                  {product.stock > 0 ? "Disponible" : "Agotado"}
                </p>
              </div>
            </div>
            <p className="text-gray-500 mt-2">{product.category_name}</p>

            <p className="text-3xl font-bold mt-4">${product.price}</p>

            <div className="mt-4 mb-2 pb-2 border-b border-gray-300">
              <h2 className="font-semibold text-xl ">Descripción</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="text-sm space-y-1">
              <p>
                <strong>Marca:</strong> {product.brand}
              </p>
              <p>
                <strong>Tipo de cabello:</strong> {product.hair_type}
              </p>
              <p>
                <strong>Beneficio:</strong> {product.benefit}
              </p>
              <p>
                <strong>Tamaño:</strong> {product.size}
              </p>
            </div>

            <div className="py-2">
              <button
                onClick={() => addToCart(product)}
                className="
                w-full
                bg-(--pinkRose)
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
                cursor-pointer
                transition-colors
                hover:bg-(--citron)
              "
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        <Ingredients categorySlug={product.category_slug} />
      </div>
    </main>
  );
}

export default ProductDetail;
