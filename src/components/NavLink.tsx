import { useLocation } from "react-router-dom"
import { RestaurantLink } from "./RestaurantLink"
import { LucideIcon } from "lucide-react"

type Props = {
    url: string,
    base?: string,
    text: string,
    icon: LucideIcon
}

export const NavLink = ({ url, base = url, text, icon: Icon }: Props) => {

    const { pathname } = useLocation()

    return <RestaurantLink
        to={url}
        className={`flex gap-3 items-center h-8 w-full text-sm px-2 rounded-md hover:bg-stone-100 border ${pathname.includes(base)
            ? "bg-stone-100 font-medium border-stone-200 shadow-sm"
            : "border-transparent"
            }`}
    >
        <div className="">
            <Icon className="size-4" />
        </div>
        <span className="hidden group-hover:block">{text}</span>
    </RestaurantLink>
}