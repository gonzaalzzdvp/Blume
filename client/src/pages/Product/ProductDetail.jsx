import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
      }
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
    <main ref={contentRef} className="min-h-[calc(100vh-88px)] mt-16 md:mt-22 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Contenedor principal responsive: flex-col en móvil, flex-row en escritorio */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 md:gap-12 lg:gap-20">
          
          {/* --- SECCIÓN DE IMÁGENES --- */}
          <div className="w-full lg:w-auto flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8">
            
            {/* Miniaturas: Horizontal con scroll en móvil, Vertical en md/lg */}
            <div className="w-full md:w-auto flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none justify-start md:justify-center">
              {allImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  onClick={() => setSelectedImage(image)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer border flex-shrink-0 transition-colors ${
                    selectedImage === image
                      ? "border-(--blackBean)"
                      : "border-transparent hover:border-(--citron)"
                  }`}
                />
              ))}
            </div>

            {/* Imagen Principal Seleccionada */}
            <div className="w-full max-w-sm md:w-80 flex justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full aspect-square md:w-80 md:h-80 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* --- SECCIÓN DE INFORMACIÓN --- */}
          <div className="w-full lg:w-[450px] xl:w-[480px] flex flex-col">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-clash-bold text-(--citron)">
                {product.title}
              </h1>
              
              <div
                className={`w-fit px-2.5 py-1 flex items-center gap-1.5 rounded-2xl ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-300 text-red-800"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.stock > 0 ? "bg-green-800" : "bg-red-800"
                  }`}
                ></span>
                <p className="text-[12px] font-medium">
                  {product.stock > 0 ? "Disponible" : "Agotado"}
                </p>
              </div>
            </div>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {product.category_name}
            </p>

            <p className="text-2xl sm:text-3xl font-bold mt-3 sm:mt-4">
              ${product.price}
            </p>

            <div className="mt-4 mb-2 pb-2 border-b border-gray-300">
              <h2 className="text-lg sm:text-xl font-ranade-bold">Descripción</h2>
              <p className="mt-2 text-gray-700 text-sm sm:text-base font-ranade-regular leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="text-xs sm:text-sm space-y-1.5 text-gray-800 font-ranade-regular">
              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">Marca:</strong> {product.brand}
              </p>
              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">Tipo de cabello:</strong> {product.hair_type}
              </p>
              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">Beneficio:</strong> {product.benefit}
              </p>
              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">Tamaño:</strong> {product.size}
              </p>
            </div>

            <div className="py-4 mt-2">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className="
                  w-full
                  bg-(--pinkRose)
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
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
                {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
              </button>
            </div>
          </div>
        </div>

        {/* Sección de ingredientes */}
        <div className="mt-12 sm:mt-16">
          <Ingredients categorySlug={product.category_slug} />
        </div>
      </div>
    </main>
  );
}