import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle, Save } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { APIResponse, Item } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { getItemTypeName } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { ItemAreasForm } from "../components/ItemAreasForm"
import { ItemProductionForm } from "../components/ItemProductionForm"

export const ItemPage = () => {

    const navigate = useNavigate()

    const { id, branch_id } = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [item, setItem] = useState<Item>()

    useLayoutEffect(() => {

        const getItem = async () => {

            setLoading(true)

            try {
                const { data: item } = await axiosAPI.get<APIResponse<Item>>(`/items/${id}`)
                setItem(item.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getItem()
    }, [])

    const updateItem = async () => {
        setUpdating(true)

        try {
            await axiosAPI.put(`/items/branch/${branch_id}/${id}`, item)
            toast.success('Ítem actualizado con éxito')
            navigate(-1)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setUpdating(false)
        }
    }

    if (loading || !item) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <>
        <section>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{`Editar ${getItemTypeName(item.type).toLowerCase()}:`}</h3>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="size-4" />
                        Volver
                    </button>
                    <button onClick={() => updateItem()} className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                        {updating ? <LoaderCircle className='size-4 animate-spin stroke-white' /> : <Save className="size-4 stroke-white" />}
                        {updating ? "Guardando" : "Guardar"}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-5 flex flex-col gap-4">
                    <ItemForm item={item} setItem={setItem} />
                    <ItemAreasForm />
                </div>
                <div className="col-span-7 flex flex-col gap-4">
                    <ItemProductionForm item={item} setItem={setItem} />
                </div>
            </div>
        </section>
    </>
}