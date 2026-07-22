import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-3  h-12 w-full px-4 bg-(--citronLight) rounded-4xl">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="
          text-xl
          text-(--blackBean)
          cursor-pointer
          hover:scale-110
          transition-transform
        "
      />
    </div>
  );
}
