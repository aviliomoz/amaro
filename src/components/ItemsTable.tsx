import toast from "react-hot-toast"
import { Ellipsis, LoaderCircle } from "lucide-react"
import { getUm } from "../utils/um"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { APIResponse, ItemSubtypeEnum, ItemType, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { getItemSubtypeName } from "../utils/items"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useFilter } from "../hooks/useFilter"
import { Pagination } from "./Pagination"

export const ItemsTable = () => {
    const { restaurant } = useRestaurant()
    const { type } = useParams<{ type: ItemTypeEnum }>()
    const [items, setItems] = useState<ItemType[]>([])
    const [itemsNumber, setItemsNumber] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const [search] = useFilter<string>("search")
    const [subtype] = useFilter<ItemSubtypeEnum>("subtype")
    const [category_id] = useFilter<string>("category_id")
    const [page, setPage] = useFilter<string>("page")

    useEffect(() => {
        const getItems = async () => {
            setLoading(true)

            try {

                let url = `/items?restaurant_id=${restaurant?.id}&type=${type}`

                if (subtype) {
                    url += `&subtype=${subtype}`
                }
                if (search) {
                    url += `&search=${search}`
                }
                if (category_id) {
                    url += `&category_id=${category_id}`
                }

                const { data: itemsNumber } = await axiosAPI.get<APIResponse<ItemType[]>>(url)
                const totalItems = itemsNumber.data.length
                setItemsNumber(totalItems)

                if (totalItems < 20) {
                    setPage("1")
                } else {
                    url += `&page=${page || 1}`
                }

                const { data } = await axiosAPI.get<APIResponse<ItemType[]>>(url)
                setItems(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getItems()
    }, [type, restaurant, subtype, search, category_id, page])

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    if (!items.length) return <div className="text-sm text-center p-4">No hay ítems para mostrar</div>

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
                {items.map(item => <tr key={item.id} className="text-sm text-center hover:bg-stone-50 border-b last:border-b-0">
                    <td className="text-left h-12 px-4"><Link to={`/restaurants/${restaurant?.slug}/items/${type}/${item.id}`}>{item.name}</Link></td>
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

        {itemsNumber > 20 && <Pagination currentPage={parseInt(page || "1")} totalPages={Math.ceil(itemsNumber / 20)} onPageChange={(newPage) => { setPage(newPage.toString()) }} />}
    </div>
}