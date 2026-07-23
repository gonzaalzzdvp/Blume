import "../../Styles/productEffect.css";

export default function ProductEffect() {
  const columns = Array.from({ length: 5 });

  return (
    <div className="h-[calc(100vh-88px)] flex justify-center gap-5 overflow-hidden ">
      {columns.map((_, colIndex) => (
        <div
          key={colIndex}
          className={`floating-column floating-${colIndex}`}
        >
          {Array.from({ length: 4 }).map((_, imgIndex) => (
            <img
              key={imgIndex}
              src="/products/example.png"
              alt=""
              className="floating-image bg-(--citron) z-0"
            />
          ))}
        </div>
      ))}
    </div>
  );
}