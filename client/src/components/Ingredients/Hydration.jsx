export default function Hydration() {
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
            Extracto de{" "}
            <span className="text-2xl text-(--blackBean) font-bold uppercase">
              Mango
            </span>
          </h3>
          <p className="h-30 w-full text-(--blackBlume)">
            Ofrece beneficios antienvejecimiento para el cabello, a la vez que
            proporciona efectos antioxidantes y antiinflamatorios para el cuero
            cabelludo.
          </p>
          <img src="/Ingredients/hidratingMango.jpg" className="w-full" />
        </div>
        <div className="w-80 flex flex-col justify-between gap-4">
          <h3 className="font-light text-2xl text-(--blackBean) uppercase">
            Aceite de{" "}
            <span className="text-2xl text-(--blackBean) font-bold uppercase">
              Argan
            </span>
          </h3>
          <p className="h-30 w-full text-(--blackBlume)">
            ¡El aceite de argán es un producto estrella para tu cabello! Nutre e
            hidrata profundamente tanto el cabello como el cuero cabelludo,
            dejándolos suaves, hidratados y con un brillo espectacular.
          </p>
          <img src="/Ingredients/hidratingArgan.png" className="w-full" />
        </div>
      </div>
    </section>
  );
}
