import {Link} from "react-router-dom";

export default function Home() {
  return (
    <header className="relative h-[calc(100vh-88px)] w-full mt-22">
      <img
        src="Home/blume_design.png"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative h-full w-full p-20 z-10 flex flex-col justify-end items-center gap-10">
        <h2 className="text-(--whiteBlume) text-5xl">Bienvenido</h2>
        <Link to="/catalog" className="p-5 text-white uppercase border border-(--whiteBlume) cursor-pointer hover:border-(--citron) hover:text-(--citron)">Comprar ahora</Link>
      </div>
    </header>
  );
}
