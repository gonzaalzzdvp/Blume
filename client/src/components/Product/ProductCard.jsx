import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {product.title}
        </h3>

        <p className="text-gray-600">
          {product.category_name}
        </p>

        <p className="font-bold mt-2">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;