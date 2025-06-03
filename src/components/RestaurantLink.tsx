import { Link, LinkProps } from "react-router-dom"
import { useRestaurant } from "../contexts/RestaurantContext"

export const RestaurantLink = ({ to, children, className, ...props }: LinkProps) => {

    const { restaurant } = useRestaurant()

    return <Link to={`/restaurants/${restaurant?.slug}${to}`} className={className} {...props}>{children}</Link>
}