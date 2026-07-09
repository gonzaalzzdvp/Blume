import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProduct } from "../services/productService";

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
      setSelectedImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div className="p-8">Cargando producto...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-88px)] mt-22 p-6 flex justify-center items-center">
      <div className="flex justify-center items-center gap-20">
        
        {/* --- SECCIÓN DE IMÁGENES --- */}
        <div className="flex justify-center items-center gap-20">
          
          {/* Columna Izquierda: Miniaturas */}
          <div className="flex flex-col gap-3">
            <img
              src={product.image}
              alt={product.title}
              onClick={() => setSelectedImage(product.image)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border transition-colors ${
                selectedImage === product.image
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
        <div className="flex flex-col w-[450px]">
          <div className="flex items-end gap-4">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-sm">
              {" "}
              {product.stock > 0 ? "Disponible" : "Agotado"}
            </p>
          </div>
          <p className="text-gray-500 mt-2">{product.category_name}</p>

          <p className="text-3xl font-bold mt-4">${product.price}</p>
          
          <div className="mt-4 mb-2 pb-2 border-b border-gray-300">
            <h2 className="font-semibold text-xl ">Descripción</h2>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
          
          <div className="text-sm space-y-1">
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Tipo de cabello:</strong> {product.hair_type}</p>
            <p><strong>Beneficio:</strong> {product.benefit}</p>
            <p><strong>Tamaño:</strong> {product.size}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </div>
          
          <div className="mt-4 mb-4 pt-4 flex flex-col gap-1 border-t border-gray-300">
            <h2 className="font-semibold text-xl">Ingredientes: </h2>
            <p className="text-sm text-gray-600">{product.ingredients}</p>
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
    </main>
  );
}

export default ProductDetail;