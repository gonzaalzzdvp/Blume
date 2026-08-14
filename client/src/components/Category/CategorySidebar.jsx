export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <aside className="w-full md:w-44 md:pr-6 shrink-0">
      <h2 className="text-xl font-clash-display mb-3 md:mb-4">Categorías</h2>

      {/* 
        En móvil: Scroll horizontal sin romper la vista
        En md+: Menú vertical tradicional 
      */}
      <div className="flex md:flex-col gap-2 md:gap-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <button
          onClick={() => onSelectCategory(null)}
          className={`
            whitespace-nowrap px-4 py-2 md:px-0 md:py-2 text-left text-(--blackBlume) cursor-pointer transition-colors
            rounded-full md:rounded-none bg-gray-100 md:bg-transparent
            ${
              selectedCategory === null
                ? "font-ranade-bold text-(--pinkRose) bg-(--pinkRose)/10 md:bg-transparent"
                : "font-ranade-regular text-(--blackBean)"
            }
          `}
        >
          🛍️ Todos
        </button>

        <button
          onClick={() => onSelectCategory("featured")}
          className={`
            whitespace-nowrap px-4 py-2 md:px-0 md:py-2 text-left text-(--blackBlume) cursor-pointer transition-colors
            rounded-full md:rounded-none bg-gray-100 md:bg-transparent
            ${
              selectedCategory === "featured"
                ? "font-ranade-bold text-(--pinkRose) bg-(--pinkRose)/10 md:bg-transparent"
                : "font-ranade-regular text-(--blackBean)"
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
              whitespace-nowrap px-4 py-2 md:px-0 md:py-2 text-left text-(--blackBlume) cursor-pointer transition-colors
              rounded-full md:rounded-none bg-gray-100 md:bg-transparent
              ${
                selectedCategory === category.slug
                  ? "font-ranade-bold text-(--pinkRose) bg-(--pinkRose)/10 md:bg-transparent"
                  : "font-ranade-regular text-(--blackBean)"
              }
            `}
          >
            🌻 {category.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
