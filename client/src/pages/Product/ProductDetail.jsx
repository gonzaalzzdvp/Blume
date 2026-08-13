import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useRef } from "react";
import gsap from "gsap";

import { useCart } from "../../context/CartContext";
import { getProduct } from "../../services/productService";

import Ingredients from "../../components/Ingredients/Ingredients";

import ProductDetailSkeleton from "../../components/Skeletons/ProductDetailSkeleton";

export default function ProductDetail() {
  const contentRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showContent, setShowContent] = useState(false);
  const { addToCart } = useCart();
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(slug);

      setProduct(data);
      setSelectedImage(data.image_url);

      requestAnimationFrame(() => {
        setShowContent(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!showContent || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      },
    );
  }, [showContent]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const allImages = [
    product.image_url,
    ...(product.images ?? [])
      .map((img) => img.image)
      .filter((img) => img !== product.image_url),
  ];

  return (
    <main ref={contentRef} className="min-h-[calc(100vh-88px)] mt-22 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-20">
          {/* --- SECCIÓN DE IMÁGENES --- */}
          <div className="flex justify-center items-center gap-20">
            {/* Columna Izquierda: Miniaturas */}
            <div className="flex flex-col gap-3">
              {allImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border transition-colors ${
                    selectedImage === image
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
              <h1 className="text-4xl font-clash-bold text-(--citron)">{product.title}</h1>
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
              <h2 className="text-xl font-ranade-bold">Descripción</h2>
              <p className="mt-2 text-gray-700 font-ranade-regular">{product.description}</p>
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
