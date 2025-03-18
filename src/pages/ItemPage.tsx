import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle, Save } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { APIResponse, EquivalenceType, FullItemType, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { ItemControlForm } from "../components/ItemControlForm"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useFilter } from "../hooks/useFilter"

export const ItemPage = () => {

    const navigate = useNavigate()

    const { type, mode } = useParams<{ type: ItemTypeEnum, mode: "new" | "edit" }>()
    const [id] = useFilter("id")
    const { branch, brand } = useRestaurant()
    const [equivalence, setEquivalence] = useState<EquivalenceType>()

    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)

    const [item, setItem] = useState<FullItemType>({
        code: '',
        name: '',
        type: type!,
        subtype: getSubtypesByType(type!)[0],
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
            const { data: item } = await axiosAPI.get<APIResponse<FullItemType>>(`/items/${id}`)
            setItem(item.data)
        }

        const getEquivalence = async () => {
            const { data: equivalence } = await axiosAPI.get<APIResponse<EquivalenceType>>(`/items/equivalence/${id}`)
            setEquivalence(equivalence.data)
        }

        if (mode === "edit") {

            setLoading(true)

            try {
                getItem()
                getEquivalence()
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
            await axiosAPI.put(`/items/branch/${branch?.id}/${id}`, { ...item, name: item.name.trim() })
            toast.success(`Ítem actualizado correctamente`)
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
            await axiosAPI.post(`/items/branch/${branch?.id}`, { ...item, name: item.name.trim() })
            toast.success(`Ítem creado correctamente`)
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

    if (loading || !item || (mode === "edit" && !item.category_id)) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

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
                </div>
                <div className="col-span-7 flex flex-col gap-4">
                    <ItemControlForm item={item} setItem={setItem} />
                </div>
            </div>
        </section>
    </>
}