import React from "react";

export default function AboutSection() {
  return (
    <section className=" w-full py-20 px-10 flex flex-col justify-center items-center gap-10">
      <h2 className="text-4xl uppercase">Somos <span className="text-(--citron)">Blume</span></h2>
        <p className="w-[80%] text-lg text-center">
          Fundada en 2022 en la vibrante Montreal, <span className="font-bold">Alcôve</span> es una marca profesional de cuidado capilar dedicada a crear rutinas personalizadas para todo tipo de cabello, incluyendo el rizado , ondulado y afro. Formulamos y fabricamos <span className="font-bold">champús , acondicionadores , productos de peinado</span> y tratamientos de alta calidad diseñados para nutrir, definir y proteger tu cabello. Nuestra misión es ofrecer soluciones genuinas y efectivas para el cuidado del cabello que brinden resultados reales, sin artificios ni filtros. Comprometidos con la transparencia, la accesibilidad y las prácticas libres de crueldad animal, Alcôve ofrece un refugio de confianza para quienes buscan productos de cuidado capilar de calidad profesional que celebren la individualidad y la belleza natural.
        </p>
    </section>
  );
}
