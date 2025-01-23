import toast from "react-hot-toast"
import { Ellipsis } from "lucide-react"
import { BranchWithBrandName } from "../schemas/branch.schema"
import { axiosAPI } from "../libs/axios"
import { APIResponse } from "../utils/types"

type Props = {
    restaurant: BranchWithBrandName
}

export const RestaurantCard = ({ restaurant }: Props) => {

    const handleClick = async () => {
        try {
            await axiosAPI.post<APIResponse<any>>(`/branches/current/${restaurant.id}`)
            location.assign("/dashboard")
        } catch (error) {
            toast.error("Ha ocurrido un error")
        }
    }

    return <article onClick={handleClick} className="bg-white rounded-md border shadow-sm p-4 text-sm w-60 cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100">
        <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-2 font-medium">
                <span className="bg-orange-500 size-2 rounded-full"></span>
                {restaurant.brand_name}
                <span className="font-normal text-xs text-stone-500">({restaurant.name})</span>
            </p>
            <button><Ellipsis className="size-5 stroke-stone-300 hover:stroke-stone-800" /></button>
        </div>

        <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-md">Administrador</span>
    </article>
}