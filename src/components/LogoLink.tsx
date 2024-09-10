import { Link } from "react-router-dom";
import logo from "/logo.png";

type Props = {
  showTitle?: boolean;
};

export function LogoLink({ showTitle = true }: Props) {
  return (
    <Link to={"/"} className="flex items-center gap-2 text-2xl font-bold">
      <img src={logo} width={24} height={24} />
      <span className={`${showTitle && "hidden sm:block"}`}>Datagrill</span>
    </Link>
  );
}
