import { useAuth } from "../contexts/AuthContext";
import logo from "/logo.svg";

type Props = {
  showTitle?: boolean;
};

export function LogoLink({ showTitle = true }: Props) {

  const { user } = useAuth()

  return (
    <a href={user ? "/restaurants" : "/"} className={`flex items-center gap-2`}>
      <img src={logo} width={25} height={25} />
      <h1 className={`${showTitle && "hidden sm:flex font-logo tracking-wide text-stone-900 items-center text-xl"}`}>Amaro</h1>
    </a>
  );
}
