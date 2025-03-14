import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle, Save } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { APIResponse, Item, ItemSubtype, ItemType } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { ItemAreasForm } from "../components/ItemAreasForm"
import { ItemProductionForm } from "../components/ItemProductionForm"
import { useRestaurant } from "../contexts/RestaurantContext"

export const ItemPage = () => {

    const navigate = useNavigate()

    const { id, type } = useParams()
    const { branch, brand } = useRestaurant()
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)

    const mode = id === "new" ? 'new' : 'edit'

    const [item, setItem] = useState<Item | Omit<Item, "id">>({
        code: '',
        name: '',
        type: type as ItemType,
        subtype: getSubtypesByType(type as ItemType)[0] as ItemSubtype,
        um: 'unit',
        cost: 0,
        price: 0,
        taxable: true,
        status: 'active',
        category_id: '',
        brand_id: brand?.id!,
        discharge_type: 'unit',
        yield: 1,
        waste: 0,
        weight_control: false,
    })


    useLayoutEffect(() => {

        const getItem = async () => {
            const { data: item } = await axiosAPI.get<APIResponse<Item>>(`/items/${id}`)
            setItem(item.data)
        }

        if (mode === "edit") {

            setLoading(true)

            try {
                getItem()
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [])

    const updateItem = async () => {
        setSaving(true)

        try {
            await axiosAPI.put(`/items/branch/${branch?.id}/${id}`, item)
            toast.success('Ítem actualizado con éxito')
            navigate(-1)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSaving(false)
        }
    }

    const saveItem = async () => {
        setSaving(true)
        try {
            await axiosAPI.post(`/items/branch/${branch?.id}`, item)
            toast.success('Ítem creado con éxito')
            navigate(-1)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSaving(false)
        }
    }

    const handleSubmit = () => {
        if (mode === "edit") updateItem()
        else saveItem()
    }

    if (loading || !item || ( mode === "edit" && !item.category_id)) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <>
        <section>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{`Editar ${getItemTypeName(item.type).toLowerCase()}:`}</h3>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="size-4" />
                        Volver
                    </button>
                    <button onClick={() => handleSubmit()} className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                        {saving ? <LoaderCircle className='size-4 animate-spin stroke-white' /> : <Save className="size-4 stroke-white" />}
                        {saving ? "Guardando" : "Guardar"}
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