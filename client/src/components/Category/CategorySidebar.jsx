export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <aside className="w-64 pr-6">

      <h2 className="text-xl font-semibold mb-4 ">
        Categorías
      </h2>

      <button
        onClick={() => onSelectCategory(null)}
        className={`
          block
          w-full
          text-left
          py-2
          cursor-pointer
          ${
            selectedCategory === null
              ? "font-bold text-(--pinkRose)"
              : ""
          }
        `}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            onSelectCategory(category.slug)
          }
          className={`
            block
            w-full
            text-left
            py-2
            cursor-pointer
            ${
              selectedCategory === category.slug
                ? "font-bold text-(--pinkRose)"
                : ""
            }
          `}
        >
          {category.name}
        </button>
      ))}

    </aside>
  );
}