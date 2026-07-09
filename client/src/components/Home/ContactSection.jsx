import React from "react";

export default function ContactSection() {
  return (
    <section className="h-[calc(100vh-88px)] w-full p-20 flex flex-col justify-center items-center gap-20">
      <h3 className="text-4xl">Contactanos</h3>
        <form className="h-40 w-auto px-10 bg-(--pinkRose) flex justify-center items-center gap-10">
          <label className="flex justify-center items-center gap-5" htmlFor="name">
            Nombre
            <input className="border bg-(--whiteBlume)" type="text" />
          </label>
          <label className="flex justify-center items-center gap-5" htmlFor="phonenumber">
            Numero de telefono
            <input className="border bg-(--whiteBlume)" type="text" />
          </label>
          <label className="flex justify-center items-center gap-5" htmlFor="email">
            Email
            <input className="border bg-(--whiteBlume)" type="email" />
          </label>
          <label className="flex justify-center items-center gap-5" htmlFor="message">
            Mensaje
            <input className="border bg-(--whiteBlume)" type="textarea" />
          </label>
        </form>
    </section>
  );
}
