import { Ellipsis } from "lucide-react"
import { Restaurant } from "@amaro-software/core"
import { Link } from "react-router-dom"

type Props = {
    restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {

    return <Link to={`/restaurants/${restaurant.slug}/dashboard`} className="flex justify-between items-start group bg-white rounded-md border shadow-sm p-6 text-sm w-full max-w-60 cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100 h-24">
        <p className="flex items-center gap-2 font-medium">
            <span className={`size-2 rounded-full bg-stone-300 group-hover:bg-orange-500`}></span>
            {restaurant.name}
            <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
        </p>
        <button><Ellipsis className="size-5 stroke-stone-300 hover:stroke-stone-800" /></button>
    </Link>
}