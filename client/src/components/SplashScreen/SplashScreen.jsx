import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import "../../Styles/SplashScreen.css"

export default function SplashScreen() {
  const { loading, hasShownSplash } = useLoading();

  const [visible, setVisible] = useState(!hasShownSplash);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (!visible || hasShownSplash) return null;

  return (
    <div className={`splash-screen ${loading ? "show" : "hide"}`}>
      <div className="logo-container">
        <img src="/Logo/Blume2.png" alt="Blume" className="w-30" />

        <h1 className="text-2xl text-(--pinkRose) uppercase font-clash-bold">
          BLUME
        </h1>

        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
