import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full bg-(--blackBean) flex flex-col justify-center items-center">
      <div className="h-[70vh] w-full bg-(--pinkRose) flex justify-between items-center ">
        <div className="flex flex-col justify-start items-center gap-6 text-(--whiteBlume)">
          <h4 className="w-[70%] text-5xl">
            Somos tus aliados para que luzcas espectacular
          </h4>
          <p className="w-[70%] text-2xl">
            Contactanos para agendar una cita y conocer mas
          </p>
          <div className="w-[70%]">
            <button className="p-4 border border-(--whiteBlume)">
              Contacto
            </button>
          </div>
        </div>
        <img src="/footer/footer.png" className="h-full" />
      </div>
      <div className="h-[40vh] bg-(--blackBean) flex justify-around items-center gap-30 text-(--whiteBlume)">
        <div className="h-60 flex flex-col gap-5">
          <h4 className="text-xl">Contact</h4>
          <ul>
            <li><Link to="/" className="hover:text-(--citron)">+58 41* *** ** **</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">email@mail.com</Link></li>
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5">
          <h4 className="text-xl">RRSS</h4>
          <ul>
            <li><Link to="/" className="hover:text-(--citron)">Fcebook</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Instagram</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Tiktok</Link></li>
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5">
          <h4 className="text-xl">Tienda</h4>
          <ul>
            <li><Link to="/" className="hover:text-(--citron)">Hidratacion</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Diario</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Volumen</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Rizos</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Violeta</Link></li>
          </ul>
        </div>
        <div className="h-60 flex flex-col gap-5">
          <h4 className="text-xl">About</h4>
          <ul>
            <li><Link to="/" className="hover:text-(--citron)">Politica de privacidad</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Terminos y condiciones</Link></li>
            <li><Link to="/" className="hover:text-(--citron)">Pagos</Link></li>
          </ul>
        </div>
      </div>
      <div className="h-10 w-[90%] flex justify-center items-center text-(--whiteBlume) border-t">
        <p>Copyright © 2025, All Rights Reserved - Develop by GonzaalzzDVP</p>
      </div>
    </div>
  );
}
