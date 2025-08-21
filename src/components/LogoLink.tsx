import logo from "/logo.svg";
import { Link } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantContext";

type Props = {
  showTitle?: boolean;
  width?: "md" | "xl"
};

export function LogoLink({ showTitle = true, width = "md" }: Props) {

  const { restaurant } = useRestaurant()

  return (
    <Link to={restaurant ? `/restaurants/${restaurant.slug}/dashboard` : "/"} className={`flex items-center gap-2 ${width === "md" ? "text-xl" : "text-[22px]"}`}>
      <img src={logo} width={30} height={30} />
      <span className={`${showTitle && "hidden sm:flex font-logo tracking-wide text-stone-900 items-center"}`}>Amaro</span>
    </Link>
  );
}
