import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header className="relative h-[calc(100vh-88px)] w-full mt-22">
      <Link>
        <img className="block md:hidden lg:hidden absolute inset-0 h-full w-full object-cover object-center" src="/Home/banner3.png" />
        <img className="hidden md:block lg:hidden absolute inset-0 h-full w-full object-cover object-center" src="/Home/banner2.png" />
        <img className="hidden lg:block absolute inset-0 h-full w-full object-cover object-center" src="/Home/banner.png" />
      </Link>
    </header>
  );
}
