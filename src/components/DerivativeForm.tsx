import { useState } from "react"
import { useItem } from "../contexts/ItemContext"
import { ItemType } from "../utils/types"

type Props = {
    setShowEditor: (show: boolean) => void
}

export const DerivativeForm = ({ setShowEditor }: Props) => {

    const { derivatives, setDerivatives, item } = useItem()
    const [derivative, setDerivative] = useState<ItemType>({
        name: "",
        category_id: item.category_id,
        type: "supplies",
        subtype: "derivatives",
        um: item.um,
        taxable: false,
        yield: 1,
        waste: 0,
        restaurant_id: item.restaurant_id,
        discharge_type: "unit",
        sale_price: 0,
        purchase_price: 0,
        cost_price: item.clean_price,
        clean_price: 0,
        cost_percentage: 32,
        status: "active",
        internal_code: "",
        external_code: "",
        has_equivalence: false,
        equivalence_um: null,
        equivalence_amount: null
    })

    const handleAddDerivative = () => {
        setDerivatives([...derivatives, derivative])
        setShowEditor(false)
    }

    return <div className="flex gap-4 text-sm justify-between">
        <input className="border rounded-md px-3 py-1.5 w-full" type="text" placeholder="Nombre del derivado" value={derivative.name} onChange={(e) => setDerivative({ ...derivative, name: e.target.value })} />
        <div className="flex gap-2">
            <button className="border shadow-sm rounded-md px-3 text-xs font-medium" type="button" onClick={() => handleAddDerivative()}>Agregar</button>
            <button className="border shadow-sm rounded-md px-3 text-xs font-medium" type="button" onClick={() => setShowEditor(false)}>Cancelar</button>
        </div>
    </div>
}