export default function Daily() {
  return (
    <section className="mt-12 pt-8 flex flex-col justify-center items-center gap-8 border-t border-(--grayBlume) ">
      <h2 className="text-4xl text-(--citron) font-semibold mb-4 uppercase">
        Ingredientes clave
      </h2>

      <div className="flex gap-10">
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--blackBean) uppercase">
            Aceite de{" "}
            <span className="text-2xl text-(--blackBean) font-bold uppercase">
              Onagra
            </span>
          </h3>
          <p className="h-30 w-full text-(--blackBlume)">
            Hidrata y protege el cabello contra los daños ambientales, a la vez
            que proporciona hidratación y protección al cuero cabelludo.
          </p>
          <img src="/Ingredients/hidratingOil.png" className="w-full" />
        </div>
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--blackBean) uppercase">
            Aceite de semilla de{" "}
            <span className="text-2xl text-(--blackBean) font-bold uppercase">
              Granada
            </span>
          </h3>
          <p className="h-30 w-full text-(--blackBlume)">
            Protege el cabello de los factores ambientales adversos, a la vez
            que protege el cuero cabelludo y previene el envejecimiento
            prematuro.
          </p>
          <img src="/Ingredients/dailyGranade.png" className="w-full" />
        </div>
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--blackBean) uppercase">
            Aceite de{" "}
            <span className="text-2xl text-(--blackBean) font-bold uppercase">
              Girasol
            </span>
          </h3>
          <p className="h-30 w-full text-(--blackBlume)">
            Protege el cabello de la pérdida de humedad a la vez que ofrece
            propiedades antiinflamatorias para hidratar y calmar el cuero
            cabelludo.
          </p>
          <img src="/Ingredients/dailySunflower.png" className="w-full" />
        </div>
      </div>
    </section>
  );
}
