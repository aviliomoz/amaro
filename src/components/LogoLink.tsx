import { useRestaurant } from "../contexts/RestaurantContext";
import logo from "/logo.svg";
import { Link } from "react-router-dom";

type Props = {
  showTitle?: boolean;
};

export function LogoLink({ showTitle = true }: Props) {

  const { restaurant } = useRestaurant()

  return (
    <Link to={`/restaurants/${restaurant?.slug}/dashboard`} className={`flex items-center gap-2`}>
      <img src={logo} width={25} height={25} />
      <h1 className={`${showTitle && "hidden sm:flex font-logo tracking-wide text-stone-900 items-center text-xl"}`}>Amaro</h1>
    </Link>
  );
}
