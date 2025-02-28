import { useNavigate, useParams } from "react-router-dom"
import { useFilter } from "../hooks/useFilter"
import { ArrowLeft, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { Item, ItemSubtype, ItemType } from "../utils/types"

export const ItemPage = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const [type] = useFilter("type")
    const [subtype] = useFilter("subtype")

    const [item, setItem] = useState<Omit<Item, "id">>({
        name: "",
        category_id: "",
        type: type as ItemType,
        subtype: subtype as ItemSubtype,
        status: "active",
        um: "kilogram",
        taxable: true,
        yield: 1,
        waste: 0,
        brand_id: "",
        discharge_type: "recipe",
        stock_control: true,
        weight_control: false,
        category_name: "",
        price: 0,
        cost: 0
    })

    const mode = id === "new" ? "create" : "update";

    useEffect(() => {
        const getItem = async () => {

        }

        if (mode === "update") {
            getItem()
        }
    }, [])

    return <>
        <section>
            <div className="flex items-center justify-between">
                <h3>{mode === "create" ? "Nuevo ítem" : "Editar ítem"}</h3>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="size-4" />
                        Volver
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                        <Save className="size-4 stroke-white" />
                        Guardar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
                <div>
                    
                </div>
            </div>
        </section>
    </>
}