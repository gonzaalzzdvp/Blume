import React from "react";

export default function ContactSection() {
  return (
    <section className="h-[calc(100vh-88px)] w-full my-10 flex flex-col justify-center items-center gap-10">
      <h3 className="text-(--blackBean) text-4xl uppercase">Contacto</h3>
      <form className="h-auto w-auto p-10 bg-(--pinkLight) flex flex-col justify-center items-center gap-5 rounded-2xl shadow-lg">
        <div className="flex gap-4">
          <label
            className="w-full flex flex-col justify-center items-start gap-2 text-(--blackBean)"
            htmlFor="name"
          >
            Nombre
            <input className="w-full border-b border-(--pinkRose) outline-none" type="text" placeholder="María"/>
          </label>
          <label
            className="w-full flex flex-col justify-center items-start gap-2 text-(--blackBean)"
            htmlFor="phonenumber"
          >
            Número de teléfono
            <input className="w-full border-b border-(--pinkRose) outline-none" type="text" placeholder="412 000 00 00"/>
          </label>
        </div>
        <label
          className="w-full flex flex-col justify-center items-start gap-2 text-(--blackBean)"
          htmlFor="email"
        >
          Email
          <input className="w-full border-b border-(--pinkRose) outline-none" type="email" placeholder="tucorrero@correo.com"/>
        </label>
        <label
          className="w-full flex flex-col justify-center items-start gap-2 text-(--blackBean)"
          htmlFor="message"
        >
          Mensaje
          <input className="w-full border-b border-(--pinkRose) outline-none" type="textarea" placeholder="Escribe el mensaje que quieras dejarnos"/>
        </label>
        <button className="bg-(--pinkRose) hover:bg-(--blackBean) py-4 px-6 text-(--whiteBlume) rounded-2xl cursor-pointer shadow-md">Enviar</button>
      </form>
    </section>
  );
}
