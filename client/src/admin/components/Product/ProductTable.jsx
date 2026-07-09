import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div
      className="
        bg-white
        mx-5
        rounded-xl
        shadow
        overflow-hidden
      "
    >
      {/* Encabezado */}
      <div
        className="
          grid
          grid-cols-[90px_2fr_1.5fr_120px_100px_110px_120px]
          gap-4
          px-6
          py-4
          bg-gray-100
          font-semibold
        "
      >
        <span>Imagen</span>
        <span>Nombre</span>
        <span>Categoría</span>
        <span>Precio</span>
        <span>Stock</span>
        <span>Estado</span>
        <span>Acciones</span>
      </div>

      {products.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No hay productos.
        </div>
      ) : (
        products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}