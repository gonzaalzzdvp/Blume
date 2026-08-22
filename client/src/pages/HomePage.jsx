import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Home from "../components/Home/Home";
import CatalogSection from "../components/Home/CatalogSection";
import BestSellers from "../components/Home/BestSellers";
import Beneficios from "../components/Home/Beneficios";
import AboutSection from "../components/Home/AboutSection";
import ContactSection from "../components/Home/ContactSection";

export default function HomePage() {
  const { hash } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (hash !== "#contact") {
      return;
    }

    const timer = setTimeout(() => {
      const contactSection = document.getElementById("contact");

      if (!contactSection) {
        return;
      }

      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      navigate("/", {
        replace: true,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div>
      <Home />

      <CatalogSection />

      <BestSellers />

      <Beneficios />

      <AboutSection />

      <ContactSection id="contact" />
    </div>
  );
}
