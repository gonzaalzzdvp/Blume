import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection({ id }) {
  const [state, handleSubmit] = useForm("xrenayve");

  return (
    <section
      id={id}
      className="min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)] w-full py-12 px-4 sm:px-6 lg:py-0 lg:px-0 lg:my-10 flex flex-col justify-center items-center gap-8 lg:gap-10"
    >
      <h3 className="text-(--pinkRose) text-2xl sm:text-3xl lg:text-4xl uppercase text-center">
        Comunícate <span className="font-clash-bold">con nosotros</span>
      </h3>

      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 lg:p-10 bg-(--pinkLight) flex flex-col gap-5 rounded-2xl shadow-lg w-full max-w-[600px] lg:w-[600px]"
      >
        {state.succeeded ? (
          <div className="min-h-[250px] lg:h-[350px] flex flex-col justify-center items-center gap-4">
            <h4 className="text-xl sm:text-2xl font-semibold text-(--pinkRose) text-center">
              ¡Mensaje enviado correctamente!
            </h4>

            <p className="text-center text-(--blackBean) text-sm sm:text-base">
              Gracias por comunicarte con nosotros. Te responderemos lo antes
              posible.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Nombre */}
              <label
                htmlFor="name"
                className="w-full flex flex-col gap-2 text-(--blackBean) text-sm sm:text-base font-ranade-bold"
              >
                Nombre
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="María Perez"
                  required
                  className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2 font-ranade-regular"
                />
              </label>

              {/* Teléfono */}
              <label
                htmlFor="phone"
                className="w-full flex flex-col gap-2 text-(--blackBean) text-sm sm:text-base font-ranade-bold"
              >
                Número de teléfono
                <input
                  id="phone"
                  name="Phone"
                  placeholder="+58 000 000 00 00"
                  type="tel"
                  className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2 font-ranade-regular"
                />
              </label>
            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="flex flex-col gap-2 text-(--blackBean) text-sm sm:text-base font-ranade-bold"
            >
              Email
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@ejemplo.com"
                required
                className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2 font-ranade-regular"
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
              className="flex flex-col gap-2 text-(--blackBean) text-sm sm:text-base font-ranade-bold"
            >
              Mensaje
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Cuéntanos cualquier cosa que quieras saber sobre Blume"
                required
                className="w-full border-b border-(--pinkRose) outline-none bg-transparent py-2 resize-none font-ranade-regular"
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
              className="bg-(--pinkRose) hover:bg-(--blackBean) py-3 sm:py-4 px-6 text-(--whiteBlume) rounded-2xl cursor-pointer shadow-md transition-colors text-sm sm:text-base font-medium mt-2"
            >
              {state.submitting ? "Enviando..." : "Enviar"}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
