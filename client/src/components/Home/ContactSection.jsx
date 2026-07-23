import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection() {
  const [state, handleSubmit] = useForm("xrenayve");

  return (
    <section className="h-[calc(100vh-88px)] w-full my-10 flex flex-col justify-center items-center gap-10">
      <h3 className="text-(--pinkRose) text-4xl uppercase font-bold">
        Comunícate con <span className="font-light">Nosotros</span>
      </h3>

      <form
        onSubmit={handleSubmit}
        className="p-10 bg-(--pinkLight) flex flex-col gap-5 rounded-2xl shadow-lg w-[600px]"
      >
        {state.succeeded ? (
          <div className="h-[350px] flex flex-col justify-center items-center gap-4">
            <h4 className="text-2xl font-semibold text-(--pinkRose)">
              ¡Mensaje enviado correctamente!
            </h4>

            <p className="text-center text-(--blackBean)">
              Gracias por comunicarte con nosotros. Te responderemos lo antes
              posible.
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              {/* Nombre */}
              <label
                htmlFor="name"
                className="w-full flex flex-col gap-2 text-(--blackBean)"
              >
                Nombre
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="María Perez"
                  required
                  className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2"
                />
              </label>

              {/* Teléfono */}
              <label
                htmlFor="phone"
                className="w-full flex flex-col gap-2 text-(--blackBean)"
              >
                Número de teléfono
                <input
                  id="phone"
                  name="Phone"
                  placeholder="+58 000 000 00 00"
                  type="tel"
                  className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2"
                />
              </label>
            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="flex flex-col gap-2 text-(--blackBean)"
            >
              Email
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@ejemplo.com"
                required
                className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2"
              />
            </label>

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Mensaje */}
            <label
              htmlFor="message"
              className="flex flex-col gap-2 text-(--blackBean)"
            >
              Mensaje
              <textarea
                id="message"
                name="message"
                rows="2"
                placeholder="Cuéntanos cualquier cosa que quieras saber sobre Blume"
                required
                className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2 resize-none"
              />
            </label>

            <ValidationError
              prefix="Mensaje"
              field="message"
              errors={state.errors}
            />

            <button
              type="submit"
              disabled={state.submitting}
              className="bg-(--pinkRose) hover:bg-(--blackBean) py-4 px-6 text-(--whiteBlume) rounded-2xl cursor-pointer shadow-md transition-colors"
            >
              {state.submitting ? "Enviando..." : "Enviar"}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
