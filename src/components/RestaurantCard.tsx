import toast from "react-hot-toast"
import { Ellipsis } from "lucide-react"
import { Restaurant } from "../utils/types"
import { axiosAPI } from "../libs/axios"

type Props = {
    restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {

    const handleClick = async () => {
        try {
            await axiosAPI.post(`/restaurants/current/${restaurant.id}`)
            location.assign("/dashboard")
        } catch (error) {
            toast.error("Ha ocurrido un error")
        }
    }

    return <article onClick={handleClick} className="bg-white rounded-md border shadow-sm p-4 text-sm w-60 cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100">
        <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 font-medium">
                <span className="bg-orange-500 size-2 rounded-full"></span>
                {restaurant.name}
                <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
            </p>
            <button><Ellipsis className="size-5 stroke-stone-300 hover:stroke-stone-800" /></button>
        </div>

        <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-md">Administrador</span>
    </article>
}