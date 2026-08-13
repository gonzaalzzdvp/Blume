export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <aside className="w-64 pr-6">
      <h2 className="text-xl font-clash-display mb-4 ">Categorías</h2>

      <button
        onClick={() => onSelectCategory(null)}
        className={`
          block
          w-full
          text-left
          py-2
          cursor-pointer
          ${selectedCategory === null ? "font-ranade-regular text-(--pinkRose)" : ""}
        `}
      >
        🛍️ Todos
      </button>

      <button
        onClick={() => onSelectCategory("featured")}
        className={`
          block
          w-full
          text-left
          py-2
          cursor-pointer
          ${
            selectedCategory === "featured" ? "font-ranade-bold text-(--pinkRose)" : ""
          }
        `}
      >
        ⭐ Destacados
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          className={`
            block
            w-full
            text-left
            py-2
            cursor-pointer
            font-ranade-regular
            ${
              selectedCategory === category.slug
                ? "font-ranade-bold text-(--pinkRose)"
                : ""
            }
          `}
        >
          🌻{" "}{category.name}
        </button>
      ))}
    </aside>
  );
}
