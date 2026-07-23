import "../../Styles/slider.css";

export default function Slider({ showPromo }) {
  return (
    <div
      className={`slider fixed top-0 left-0 w-full h-6 bg-(--citron) text-(--whiteBlume) font-semibold z-50 transition-transform duration-300 ${
        showPromo ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--height": "24px",
        "--width": "380px", 
        "--quantity": "3",
      }}
    >
      <div className="list">
        <div className="item text-sm italic" style={{ "--position": 1 }}>
          Florecer es un proceso 🌷
        </div>
        <div className="item text-sm italic" style={{ "--position": 2 }}>
          Florecer es un proceso 🌷
        </div>
        <div className="item text-sm italic" style={{ "--position": 3 }}>
          Florecer es un proceso 🌷
        </div>
      </div>
    </div>
  );
}