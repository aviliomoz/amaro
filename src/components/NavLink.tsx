import { useLocation } from "react-router-dom"
import { RestaurantLink } from "./RestaurantLink"
import { LucideIcon } from "lucide-react"

type Props = {
    url: string,
    base?: string,
    children: React.ReactNode
    icon: LucideIcon
}

export const NavLink = ({ url, base = url, children, icon: Icon }: Props) => {

    const { pathname } = useLocation()

    return <RestaurantLink
        to={url}
        className={`flex items-center gap-3 text-sm px-2 py-1 rounded-md hover:bg-stone-100 border ${pathname.includes(base)
            ? "bg-stone-100 font-medium border-stone-200 shadow-sm"
            : "border-transparent"
            }`}
    >
        <Icon className="size-4" />{children}
    </RestaurantLink>
}