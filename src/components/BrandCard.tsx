import { Ellipsis } from "lucide-react"
import { Brand } from "../utils/types"
import { Link, useParams } from "react-router-dom"

type Props = {
    brand: Brand
}

export const BrandCard = ({ brand }: Props) => {

    const { brand_id } = useParams()

    return <Link to={`/brands/${brand.id}`} className="flex justify-between items-center group bg-white rounded-md border shadow-sm p-4 text-sm w-full cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100">
        <p className="flex items-center gap-2 font-medium">
            <span className={`${brand_id && brand_id === brand.id ? "bg-orange-500" : "bg-stone-300 hidden"} size-2 rounded-full group-hover:block`}></span>
            {brand.name}
            <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
        </p>
        <button><Ellipsis className="size-5 stroke-stone-300 hover:stroke-stone-800" /></button>
    </Link>
}