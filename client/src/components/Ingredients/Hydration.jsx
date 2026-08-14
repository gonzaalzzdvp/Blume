export default function Hydration() {
  return (
    <section className="mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col justify-center items-center gap-6 md:gap-8 border-t border-(--grayBlume)">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-(--blackBean) mb-2 md:mb-4 uppercase font-clash-bold text-center">
        Ingredientes clave
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-4 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl">
          <h3 className="font-light text-xl sm:text-2xl text-(--yellowBlume) uppercase">
            Aceite de{" "}
            <span className="text-xl sm:text-2xl text-(--yellowBlume) font-bold uppercase font-clash-bold">
              Onagra
            </span>
          </h3>
          <p className="text-sm sm:text-base text-(--blackBlume) font-ranade-regular leading-relaxed">
            Hidrata y protege el cabello contra los daños ambientales, a la vez
            que proporciona hidratación y protección al cuero cabelludo.
          </p>
          <img
            src="/Ingredients/hidratingOil.png"
            alt="Aceite de Onagra"
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl">
          <h3 className="font-light text-xl sm:text-2xl text-(--yellowBlume) uppercase">
            Extracto de{" "}
            <span className="text-xl sm:text-2xl text-(--yellowBlume) font-bold uppercase font-clash-bold">
              Mango
            </span>
          </h3>
          <p className="text-sm sm:text-base text-(--blackBlume) font-ranade-regular leading-relaxed">
            Ofrece beneficios antienvejecimiento para el cabello, a la vez que
            proporciona efectos antioxidantes y antiinflamatorios para el cuero
            cabelludo.
          </p>
          <img
            src="/Ingredients/hidratingMango.jpg"
            alt="Extracto de Mango"
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl">
          <h3 className="font-light text-xl sm:text-2xl text-(--yellowBlume) uppercase">
            Aceite de{" "}
            <span className="text-xl sm:text-2xl text-(--yellowBlume) font-bold uppercase font-clash-bold">
              Argan
            </span>
          </h3>
          <p className="text-sm sm:text-base text-(--blackBlume) font-ranade-regular leading-relaxed">
            ¡El aceite de argán es un producto estrella para tu cabello! Nutre e
            hidrata profundamente tanto el cabello como el cuero cabelludo,
            dejándolos suaves, hidratados y con un brillo espectacular.
          </p>
          <img
            src="/Ingredients/hidratingArgan.png"
            alt="Aceite de Argán"
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
