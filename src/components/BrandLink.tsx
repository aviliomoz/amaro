import { Link, LinkProps } from "react-router-dom"
import { useRestaurant } from "../contexts/RestaurantContext"

export const BrandLink = ({ to, children, className, ...props }: LinkProps) => {

    const { brand, branch } = useRestaurant()

    return <Link to={`/brands/${brand?.slug}/branches/${branch?.slug}${to}`} className={className} {...props}>{children}</Link>
}