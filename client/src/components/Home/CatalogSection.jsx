import React from "react";

export default function CatalogSection() {
  return (
    <section className="h-[calc(100vh-88px)] w-full p-20 flex flex-col justify-center items-center">
      <div className="w-full text-center">
        <h2 className="text-(--blackBean) text-4xl">Categorias</h2>
      </div>
      <div className="h-full w-full flex justify-center items-center gap-10">
        <div className=" flex flex-col justify-center items-center gap-5">
          <img src="" className="h-40 w-40" />
          <p className="w-full flex justify-center items-center">Hidratacion</p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5">
          <img src="" className="h-40 w-40" />
          <p className="w-full flex justify-center items-center">Diario</p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5">
          <img src="" className="h-40 w-40" />
          <p className="w-full flex justify-center items-center">Volumen</p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5">
          <img src="" className="h-40 w-40" />
          <p className="w-full flex justify-center items-center">Rizos</p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5">
          <img src="" className="h-40 w-40" />
          <p className="w-full flex justify-center items-center">Violeta</p>
        </div>
      </div>
    </section>
  );
}
