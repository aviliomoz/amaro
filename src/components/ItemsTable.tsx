import { Ellipsis, LoaderCircle } from "lucide-react"
import { getUm } from "../utils/um"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { APIResponse, Item, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import toast from "react-hot-toast"
import { getItemSubtypeName } from "../utils/items"
import { useRestaurant } from "../contexts/RestaurantContext"

export const ItemsTable = () => {
    const navigate = useNavigate()
    const { branch, brand } = useRestaurant()
    const { type } = useParams<{type: ItemTypeEnum}>()
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getItems = async () => {
            setLoading(true)

            try {
                const { data } = await axiosAPI.get<APIResponse<Item[]>>(`/items?branch_id=${branch?.id}&type=${type}`)
                setItems(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getItems()
    }, [type, branch])

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <div className="border rounded-md w-full h-fit overflow-hidden">
        <table className="w-full">
            <thead>
                <tr className="text-sm bg-stone-50 border-b shadow-sm h-10">
                    <th className="px-4 text-left font-semibold min-w-32 truncate">Nombre</th>
                    {type !== "combos" && <th className="px-4 font-semibold">Unidad de medida</th>}
                    <th className="px-4 font-semibold">Tipo</th>
                    <th className="px-4 font-semibold">Estado</th>
                    <th className="px-4 font-semibold">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => <tr onClick={() => navigate(`/brands/${brand?.slug}/branches/${branch?.slug}/items/${type}/edit?id=${item.id}`)} key={item.id} className="text-sm text-center hover:bg-stone-50 cursor-pointer border-b last:border-b-0">
                    <td className="text-left h-12 px-4">{item.name}</td>
                    {type !== "combos" && <td>{getUm(item.um)}</td>}
                    <td>{getItemSubtypeName(item.subtype)}</td>
                    <td>{item.status === "active" ? "Activo" : item.status === "inactive" && "Inactivo"}</td>
                    <td className="flex items-center justify-center pt-4"><Ellipsis onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }} className="size-4 cursor-pointer stroke-stone-400 hover:stroke-stone-700" /></td>
                </tr>)}
            </tbody>
        </table>
    </div>
}