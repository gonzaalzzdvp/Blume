import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection({ id }) {
  const [state, handleSubmit] = useForm("xrenayve");

  return (
    <section
      id={id}
      className="
        min-h-[calc(100vh-88px)]
        w-full
        px-4
        sm:px-6
        py-12
        lg:py-0
        flex
        flex-col
        justify-center
        items-center
        gap-6
        lg:gap-5
      "
    >
      {/* Título */}
      <h3
        className="
          w-80
          md:w-full
          text-(--pinkRose)
          text-2xl
          sm:text-3xl
          lg:text-4xl
          uppercase
          text-center
        "
      >
        Comunícate <span className="font-clash-bold">con&nbsp;nosotros</span>
      </h3>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="
          p-6
          sm:p-8
          lg:p-8
          bg-(--pinkLight)
          rounded-2xl
          shadow-lg
          w-full
          max-w-[600px]
          lg:max-w-5xl
          flex
          flex-col
          gap-4
        "
      >
        {state.succeeded ? (
          <div
            className="
              min-h-[220px]
              flex
              flex-col
              justify-center
              items-center
              gap-4
            "
          >
            <h4
              className="
                text-xl
                sm:text-2xl
                font-semibold
                text-(--pinkRose)
                text-center
              "
            >
              ¡Mensaje enviado correctamente!
            </h4>

            <p
              className="
                text-center
                text-(--blackBean)
                text-sm
                sm:text-base
              "
            >
              Gracias por comunicarte con nosotros. Te responderemos lo antes
              posible.
            </p>
          </div>
        ) : (
          <>
            {/* Primera fila */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Nombre */}
              <label
                htmlFor="name"
                className="
                  w-full
                  flex
                  flex-col
                  gap-1.5
                  text-(--blackBean)
                  text-sm
                  font-ranade-bold
                "
              >
                Nombre
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="María Perez"
                  required
                  className="
                    w-full
                    border-b
                    border-(--pinkRose)
                    outline-none
                    bg-transparent
                    py-1.5
                    font-ranade-regular
                  "
                />
              </label>

              {/* Teléfono */}
              <label
                htmlFor="phone"
                className="
                  w-full
                  flex
                  flex-col
                  gap-1.5
                  text-(--blackBean)
                  text-sm
                  font-ranade-bold
                "
              >
                Número de teléfono
                <input
                  id="phone"
                  name="Phone"
                  placeholder="+58 000 000 00 00"
                  type="tel"
                  className="
                    w-full
                    border-b
                    border-(--pinkRose)
                    outline-none
                    bg-transparent
                    py-1.5
                    font-ranade-regular
                  "
                />
              </label>

              {/* Email */}
              <label
                htmlFor="email"
                className="
                  w-full
                  flex
                  flex-col
                  gap-1.5
                  text-(--blackBean)
                  text-sm
                  font-ranade-bold
                "
              >
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@ejemplo.com"
                  required
                  className="
                    w-full
                    border-b
                    border-(--pinkRose)
                    outline-none
                    bg-transparent
                    py-1.5
                    font-ranade-regular
                  "
                />
              </label>
            </div>

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Mensaje */}
            <label
              htmlFor="message"
              className="
                flex
                flex-col
                gap-1.5
                text-(--blackBean)
                text-sm
                font-ranade-bold
              "
            >
              Mensaje
              <textarea
                id="message"
                name="message"
                rows="2"
                placeholder="Cuéntanos cualquier cosa que quieras saber sobre Blume"
                required
                className="
                  w-full
                  border-b
                  border-(--pinkRose)
                  outline-none
                  bg-transparent
                  py-1.5
                  resize-none
                  font-ranade-regular
                "
              />
            </label>

            <ValidationError
              prefix="Mensaje"
              field="message"
              errors={state.errors}
            />

            {/* Botón */}
            <div className="w-full flex justify-center pt-1">
              <button
                type="submit"
                disabled={state.submitting}
                className="
                  bg-(--citron)
                  hover:bg-(--blackBean)
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
                  w-40
                  py-2.5
                  px-6
                  text-(--whiteBlume)
                  rounded-xl
                  cursor-pointer
                  shadow-md
                  transition-colors
                  text-sm
                  font-medium
                "
              >
                {state.submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}
