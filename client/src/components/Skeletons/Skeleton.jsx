export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        bg-gray-200
        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_1.8s_infinite]
          bg-linear-to-r
          from-transparent
          via-white/70
          to-transparent
        "
      />
    </div>
  );
}