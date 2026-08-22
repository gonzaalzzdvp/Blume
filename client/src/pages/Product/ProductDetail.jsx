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
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

      // Reiniciamos la cantidad cuando cambia el producto.
      setQuantity(1);

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

  /*
   * ==========================================
   * CANTIDAD
   * ==========================================
   */

  const decreaseQuantity = () => {
    if (isAddingToCart) return;

    setQuantity((current) => Math.max(current - 1, 1));
  };

  const increaseQuantity = () => {
    if (isAddingToCart || !product) return;

    setQuantity((current) => Math.min(current + 1, product.stock));
  };

  /*
   * ==========================================
   * AGREGAR AL CARRITO
   * ==========================================
   */

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0 || quantity < 1 || isAddingToCart) {
      return;
    }

    setIsAddingToCart(true);

    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const allImages = [
    product.image_url,
    ...(product.images ?? [])
      .map((img) => img.image)
      .filter((img) => img !== product.image_url),
  ];

  const isOutOfStock = product.stock <= 0;
  const isMinQuantity = quantity <= 1;
  const isMaxQuantity = quantity >= product.stock;

  return (
    <main
      ref={contentRef}
      className="min-h-[calc(100vh-88px)] mt-16 md:mt-22 px-4 sm:px-6 py-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Contenedor principal responsive */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 md:gap-12 lg:gap-20">
          {/* ==========================================
              IMÁGENES
          ========================================== */}

          <div className="w-full lg:w-auto flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8">
            {/* Miniaturas */}
            <div className="w-full md:w-auto flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none justify-start md:justify-center">
              {allImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  onClick={() => setSelectedImage(image)}
                  className={`
                    w-16
                    h-16
                    sm:w-20
                    sm:h-20
                    object-cover
                    rounded
                    cursor-pointer
                    border
                    flex-shrink-0
                    transition-colors
                    ${
                      selectedImage === image
                        ? "border-(--blackBean)"
                        : "border-transparent hover:border-(--citron)"
                    }
                  `}
                />
              ))}
            </div>

            {/* Imagen principal */}
            <div className="w-full max-w-sm md:w-80 flex justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full aspect-square md:w-80 md:h-80 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* ==========================================
              INFORMACIÓN DEL PRODUCTO
          ========================================== */}

          <div className="w-full lg:w-[450px] xl:w-[480px] flex flex-col">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-clash-bold text-(--citron)">
                {product.title}
              </h1>

              <div
                className={`
                  w-fit
                  px-2.5
                  py-1
                  flex
                  items-center
                  gap-1.5
                  rounded-2xl
                  ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-300 text-red-800"
                  }
                `}
              >
                <span
                  className={`
                    w-2
                    h-2
                    rounded-full
                    ${product.stock > 0 ? "bg-green-800" : "bg-red-800"}
                  `}
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

            {/* Descripción */}
            <div className="mt-4 mb-2 pb-2 border-b border-gray-300">
              <h2 className="text-lg sm:text-xl font-ranade-bold">
                Descripción
              </h2>

              <p className="mt-2 text-gray-700 text-sm sm:text-base font-ranade-regular leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Información adicional */}
            <div className="text-xs sm:text-sm space-y-1.5 text-gray-800 font-ranade-regular">
              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">
                  Marca:
                </strong>{" "}
                {product.brand}
              </p>

              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">
                  Tipo de cabello:
                </strong>{" "}
                {product.hair_type}
              </p>

              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">
                  Beneficio:
                </strong>{" "}
                {product.benefit}
              </p>

              <p>
                <strong className="font-ranade-bold text-(--orangeBlume)">
                  Tamaño:
                </strong>{" "}
                {product.size}
              </p>
            </div>

            {/* ==========================================
                CANTIDAD + CARRITO
            ========================================== */}

            <div className="py-4 mt-2">
              {/* Selector de cantidad */}
              {!isOutOfStock && (
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-sm font-ranade-bold text-(--blackBean)">
                    Cantidad
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Menos */}
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={isMinQuantity || isAddingToCart}
                      aria-label="Disminuir cantidad"
                      className="w-7 h-7 sm:w-8 sm:h-8 shadow-sm border border-(--grayBlume) rounded-full hover:bg-(--grayBlume) cursor-pointer flex items-center justify-center font-medium"
                    >
                      −
                    </button>

                    {/* Cantidad */}
                    <span
                      className="
                        min-w-10
                        text-center
                        text-lg
                        font-ranade-bold
                        text-(--blackBean)
                      "
                    >
                      {quantity}
                    </span>

                    {/* Más */}
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={isMaxQuantity || isAddingToCart}
                      aria-label="Aumentar cantidad"
                      className="w-7 h-7 sm:w-8 sm:h-8 shadow-sm border border-(--grayBlume) rounded-full hover:bg-(--grayBlume) cursor-pointer flex items-center justify-center font-medium"
                    >
                      +
                    </button>

                  </div>
                </div>
              )}

              {/* Botón agregar */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                className="
                  w-full
                  bg-(--citron)
                  hover:bg-(--blackBean)
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  cursor-pointer
                  transition-colors
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                {isOutOfStock ? (
                  "Agotado"
                ) : isAddingToCart ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                      />

                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V1C5.477 1 1 5.477 1 12h3z"
                      />
                    </svg>
                    Agregando...
                  </>
                ) : (
                  `Agregar ${quantity > 1 ? `${quantity} unidades` : "al carrito"}`
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="mt-12 sm:mt-16">
          <Ingredients categorySlug={product.category_slug} />
        </div>
      </div>
    </main>
  );
}
