import { Item } from "../utils/types"
import { QuestionCircle } from "./QuestionCircle"

type Props = {
    item: Item | Omit<Item, "id">
    setItem: (item: Item | Omit<Item, "id">) => void
}

export const ItemProductionForm = ({ item, setItem }: Props) => {
    return <form className="border rounded-md p-6 col-span-7 shadow-sm flex flex-col gap-5 h-fit">
        <h4 className="font-semibold mb-1 text-sm">Producción y control:</h4>
        {((item.type === "products" && item.subtype === "unprocessed" && item.um === "unit") || (item.type === "supplies" && item.subtype === "ingredients" && item.um === "unit")) && <div className="flex flex-col col-span-12 gap-1 mb-2">
            <h5 className="font-semibold mb-1 text-sm flex items-center gap-2">Equivalencia <QuestionCircle /></h5>
            <button className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
                Agregar equivalencia
            </button>
        </div>}
        <div className="flex flex-col gap-2 mb-2">
            <h5 className="font-semibold mb-1 text-sm flex items-center gap-2">Derivados <QuestionCircle /></h5>
            <button className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
                Agregar derivado
            </button>
        </div>
        <div className="flex flex-col gap-2 mb-2">
            <h5 className="font-semibold mb-1 text-sm flex items-center gap-2">Presentaciones de compra <QuestionCircle /></h5>
            <button className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
                Agregar presentación
            </button>
        </div>
        {((item.type === "products" && item.subtype === "unprocessed" && item.um === "unit") || (item.type === "supplies" && item.subtype === "ingredients" && item.um === "unit")) && <div className="flex flex-col gap-2 border-t pt-6 mt-2 border-dashed">
            <h4 className="font-semibold mb-2 text-sm">Opciones de inventario:</h4>
            <fieldset className="flex gap-2 items-center text-sm">
                <input className="cursor-pointer" id="weight_control" type="checkbox" checked={item.weight_control} onChange={(e) => setItem({ ...item, weight_control: e.target.checked })} />
                <label className="font-medium cursor-pointer mr-2" htmlFor="weight_control">Controlar por peso</label>
                <QuestionCircle />
            </fieldset>
        </div>}
    </form>
}