import React from "react";

export default function Beneficios() {
  const benefits = [
    { src: "/Home/beneficts/noanimaltesting.png", alt: "No Animal Testing" },
    { src: "/Home/beneficts/colorsafe.png", alt: "Color Safe" },
    { src: "/Home/beneficts/glutenfree.png", alt: "Gluten Free" },
    {
      src: "/Home/beneficts/sulfateysaltfree.png",
      alt: "Sulfate and Salt Free",
    },
    { src: "/Home/beneficts/vegan.png", alt: "Vegan" },
    { src: "/Home/beneficts/parabenfree.png", alt: "Paraben Free" },
  ];

  return (
    <div className="bg-(--citronLight) min-h-[25rem] lg:h-100 w-full py-12 px-6 md:py-16 md:px-10 lg:py-20 flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-20">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl text-(--citron) uppercase text-center">
        <span className="font-clash-bold block sm:inline">
        ALcove{" "}
        </span>
          es...
      </h3>

      <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:flex lg:justify-center items-center gap-4 sm:gap-6 lg:gap-10">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-20 sm:h-24 lg:h-30 transition-all duration-300 hover:scale-105 lg:hover:h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
