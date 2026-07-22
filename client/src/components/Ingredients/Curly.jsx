export default function Curly() {
  return (
    <section className="mt-12 pt-8 flex flex-col justify-center items-center gap-8 border-t border-(--grayBlume) ">
      <h2 className="text-4xl text-(--blackBean) font-semibold mb-4 uppercase">
        Ingredientes clave
      </h2>

      <div className="flex gap-10">
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--citron) uppercase">
            Aceite de{" "}
            <span className="text-2xl text-(--citron) font-bold uppercase">
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
        <div className="flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--citron) uppercase">
            Extracto de{" "}
            <span className="text-2xl text-(--citron) font-bold uppercase">
              Mango
            </span>
          </h3>
          <p className="h-30 w-80 text-(--blackBlume)">
            Ofrece beneficios antienvejecimiento para el cabello, a la vez que
            proporciona efectos antioxidantes y antiinflamatorios para el cuero
            cabelludo.
          </p>
          <img src="/Ingredients/hidratingMango.jpg" className="w-80" />
        </div>
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--citron) uppercase">
            Aceite de semilla de{" "}
            <span className="text-2xl text-(--citron) font-bold uppercase">
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
      </div>
    </section>
  );
}
