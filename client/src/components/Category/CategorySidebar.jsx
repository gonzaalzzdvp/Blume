export default function CategorySidebar({
  categories,
  selectedCategory,
  featured,
  onSelectCategory,
  onSelectFeatured,
}) {
  return (
    <aside className="w-full md:w-44 md:pr-6 shrink-0">
      <h2 className="text-xl font-clash-display mb-3 md:mb-4">Categorías</h2>

      <div className="flex md:flex-col gap-2 md:gap-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {/* Todos */}
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`
            whitespace-nowrap
            px-4 py-2
            md:px-0 md:py-2
            text-left
            text-(--blackBlume)
            cursor-pointer
            transition-colors
            rounded-full
            md:rounded-none
            bg-gray-100
            md:bg-transparent

            ${
              !featured && selectedCategory === null
                ? "font-ranade-bold text-(--pinkRose) bg-(--pinkRose)/10 md:bg-transparent"
                : "font-ranade-regular text-(--blackBean)"
            }
          `}
        >
          🛍️ Todos
        </button>

        {/* Destacados */}
        <button
          type="button"
          onClick={onSelectFeatured}
          className={`
            whitespace-nowrap
            px-4 py-2
            md:px-0 md:py-2
            text-left
            text-(--blackBlume)
            cursor-pointer
            transition-colors
            rounded-full
            md:rounded-none
            bg-gray-100
            md:bg-transparent

            ${
              featured
                ? "font-ranade-bold text-(--pinkRose) bg-(--pinkRose)/10 md:bg-transparent"
                : "font-ranade-regular text-(--blackBean)"
            }
          `}
        >
          ⭐ Destacados
        </button>

        {/* Categorías */}
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.slug)}
            className={`
              whitespace-nowrap
              px-4 py-2
              md:px-0 md:py-2
              text-left
              text-(--blackBlume)
              cursor-pointer
              transition-colors
              rounded-full
              md:rounded-none
              bg-gray-100
              md:bg-transparent

              ${
                !featured && selectedCategory === category.slug
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
