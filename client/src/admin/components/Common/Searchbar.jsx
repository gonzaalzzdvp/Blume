import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}) {
  return (
    <div className="relative w-full">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          pl-11
          pr-4
          py-3
          outline-none
          focus:border-(--pinkRose)
        "
      />
    </div>
  );
}