import { Link } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";

export const LandingPage = () => {
  return (
    <>
      <header className="flex justify-between items-center h-20 sm:px-12 px-8">
        <LogoLink />
        <ul className="flex items-center gap-10 text-sm font-medium">
          <Link to={"#"}>Producto</Link>
          <Link to={"#"}>Documentación</Link>
          <Link to={"#"}>Blog</Link>
          <Link to={"#"}>Precios</Link>
        </ul>
        <div className="flex items-center text-sm gap-4">
          <Link
            to={"/dashboard"}
            className="font-medium bg-white rounded-md border px-4 py-1.5 hover:bg-stone-50"
          >
            Iniciar sesión
          </Link>
          <Link
            to={"/dashboard"}
            className="font-medium bg-orange-500 rounded-md text-white px-4 py-1.5 hover:bg-orange-400"
          >
            Registrarse
          </Link>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </>
  );
};
