import React from "react";

export default function AboutSection() {
  return (
    <section className="w-full py-12 px-6 md:py-16 md:px-10 lg:py-20 flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-(--yellowBlume) uppercase font-light text-center">
        ¡Hola{" "}
        <span className="text-(--yellowBlume) font-clash-bold">Blumie!</span>
      </h2>

      <p className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] text-base lg:text-lg text-center font-ranade-regular leading-relaxed md:leading-normal">
        Blume nace de la convicción de que{" "}
        <span className="text-(--orangeBlume) font-ranade-Bold-italic">todo cabello merece florecer </span>
         . Nuestro fuerte son los productos formulados con cuidado e intención, pensados para acercar tu cabello a su mejor versión — sin importar su volumen, su forma o su textura. Cada línea constituye una rutina completa que se adapta a ti, para que cada paso se sienta como un ritual de renovación y amor propio. Porque cuidar bien de tu físico no debe ser la excepción, es el punto de partida.
      </p>
    </section>
  );
}
