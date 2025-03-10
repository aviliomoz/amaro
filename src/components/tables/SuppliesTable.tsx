import toast from "react-hot-toast"
import { Ellipsis, LoaderCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { APIResponse, Item } from "../../utils/types"
import { useEffect, useState } from "react"
import { axiosAPI } from "../../libs/axios"
import { getUm } from "../../utils/um"

export const SuppliesTable = () => {

    const navigate = useNavigate()
    const { branch_id, brand_id } = useParams()
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getCombos = async () => {
            setLoading(true)

            try {
                const { data } = await axiosAPI.get<APIResponse<Item[]>>(`/items/branch/${branch_id}?type=supply`)
                setItems(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getCombos()
    }, [])

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <div className="border rounded-md w-full h-fit overflow-hidden">
        <table className="w-full">
            <thead>
                <tr className="text-sm bg-stone-50 border-b shadow-sm h-10">
                    <th className="px-4 text-left font-semibold min-w-32 truncate">Nombre</th>
                    <th className="px-4 font-semibold w-20">U. M.</th>
                    <th className="px-4 font-semibold">Tipo</th>
                    <th className="px-4 font-semibold w-20">Precio</th>
                    <th className="px-4 font-semibold">Estado</th>
                    <th className="px-4 font-semibold">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => <tr onClick={() => navigate(`/brands/${brand_id}/branches/${branch_id}/items/${item.id}`)} key={item.id} className="text-sm text-center hover:bg-stone-50 cursor-pointer border-b last:border-b-0">
                    <td className="text-left h-12 px-4">{item.name}</td>
                    <td>{getUm(item.um)}</td>
                    <td>{item.subtype === "ingredient" ? "Ingrediente" : item.subtype === "disposable" ? "Descartable" : item.subtype === "other" && "Artículo"}</td>
                    <td>{item.price.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2, style: "currency", currency: "PEN" })}</td>
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