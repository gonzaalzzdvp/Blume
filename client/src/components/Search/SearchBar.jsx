export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          border
          border-(--citron)
          rounded-lg
          px-4
          py-3
          outline-none
          focus:border-(--pinkRose)
        "
      />

    </div>
  );
}