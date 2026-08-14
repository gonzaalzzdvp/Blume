import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Home from "../components/Home/Home";
import CatalogSection from "../components/Home/CatalogSection";
import BestSellers from "../components/Home/BestSellers";
import Beneficios from "../components/Home/Beneficios";
import AboutSection from "../components/Home/AboutSection";
import ContactSection from "../components/Home/ContactSection";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("scrollTo") !== "contact") {
      return;
    }

    // Esperamos a que el contenido de Home esté renderizado
    const timeout = setTimeout(() => {
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Limpiamos el parámetro de la URL
        searchParams.delete("scrollTo");
        setSearchParams(searchParams, { replace: true });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchParams, setSearchParams]);

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
