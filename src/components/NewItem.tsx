import { useState } from "react"
import { ItemForm } from "./ItemForm"
import { Item, ItemSubtype, ItemType } from "../utils/types"
import { useFilter } from "../hooks/useFilter"
import { getItemTypeName } from "../utils/items"
import { ItemAreasForm } from "./ItemAreasForm"
import { LoaderCircle, Save } from "lucide-react"
import toast from "react-hot-toast"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"

type Props = {
    afterSave: () => void
}

export const NewItem = ({ afterSave }: Props) => {

    const [type] = useFilter("type", "product")
    const [subtype] = useFilter("subtype", "transformed")
    const { brand, branch } = useRestaurant()

    const [saving, setSaving] = useState<boolean>(false)

    const [item, setItem] = useState<Omit<Item, "id">>({
        code: '',
        name: '',
        type: type as ItemType,
        subtype: subtype as ItemSubtype,
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

    const saveItem = async () => {
        setSaving(true)
        try {
            await axiosAPI.post(`/items/branch/${branch?.id}`, item)
            setSaving(false)
            toast.success('Ítem creado con éxito')
            afterSave()
        } catch (error) {
            toast.error((error as Error).message)
            setSaving(false)
        }
    }

    return <section className="flex flex-col gap-4">
        <h4 className="font-semibold text-sm">{`Crear ${getItemTypeName(item.type).toLowerCase()}`}</h4>
        <ItemForm item={item} setItem={setItem} />
        <ItemAreasForm />
        <div className="flex items-center gap-6 mt-2 justify-end">
            <button onClick={() => saveItem()} className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                {saving ? <LoaderCircle className='size-4 animate-spin stroke-white' /> : <Save className="size-4 stroke-white" />}
                {saving ? "Guardando" : "Guardar"}
            </button>
        </div>
    </section>
}