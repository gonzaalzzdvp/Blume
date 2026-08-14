export default function Violet() {
  return (
    <section className="mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col justify-center items-center gap-6 md:gap-8 border-t border-(--grayBlume)">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-(--pinkRose) mb-2 md:mb-4 uppercase font-clash-bold text-center">
        Ingredientes clave
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-4 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl">
          <h3 className="font-light text-xl sm:text-2xl text-(--blackBean) uppercase">
            Aceite de{" "}
            <span className="text-xl sm:text-2xl text-(--blackBean) font-bold uppercase font-clash-bold">
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
          <h3 className="font-light text-xl sm:text-2xl text-(--blackBean) uppercase">
            Aceite de semilla de{" "}
            <span className="text-xl sm:text-2xl text-(--blackBean) font-bold uppercase font-clash-bold">
              Granada
            </span>
          </h3>
          <p className="text-sm sm:text-base text-(--blackBlume) font-ranade-regular leading-relaxed">
            Protege el cabello de los factores ambientales adversos, a la vez
            que protege el cuero cabelludo y previene el envejecimiento
            prematuro.
          </p>
          <img
            src="/Ingredients/dailyGranade.png"
            alt="Aceite de semilla de Granada"
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl">
          <h3 className="font-light text-xl sm:text-2xl text-(--blackBean) uppercase">
            Aceite de{" "}
            <span className="text-xl sm:text-2xl text-(--blackBean) font-bold uppercase font-clash-bold">
              Girasol
            </span>
          </h3>
          <p className="text-sm sm:text-base text-(--blackBlume) font-ranade-regular leading-relaxed">
            Protege el cabello de la pérdida de humedad a la vez que ofrece
            propiedades antiinflamatorias para hidratar y calmar el cuero
            cabelludo.
          </p>
          <img
            src="/Ingredients/dailySunflower.png"
            alt="Aceite de Girasol"
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
