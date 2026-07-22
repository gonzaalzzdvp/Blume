import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header className="relative h-[calc(100vh-88px)] w-full mt-22">
      <Link>
        <img
          src="Home/banner.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </Link>
    </header>
  );
}
