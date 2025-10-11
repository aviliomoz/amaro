import { Link, LinkProps } from "react-router-dom"
import { useRestaurant } from "../contexts/RestaurantContext"

export const RestaurantLink = ({ to, children, className, ...props }: LinkProps) => {

    const { restaurant } = useRestaurant()

    return <Link to={restaurant ? `/restaurants/${restaurant?.slug}${to}` : to} className={className} {...props}>{children}</Link>
}