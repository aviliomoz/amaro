import { useEffect } from "react"
import { getItemSubtypeName, getSubtypesByType } from "../utils/items"
import { Item, ItemSubtype, UM } from "../utils/types"
import { CategorySelect } from "./CategorySelect"
import { CurrencySymbol } from "./CurrencySymbol"
import { QuestionCircle } from "./QuestionCircle"

type Props = {
    item: Item | Omit<Item, "id">
    setItem: (item: Item | Omit<Item, "id">) => void
}

export const ItemForm = ({ item, setItem }: Props) => {

    useEffect(() => {
        if (item.taxable) {
            setItem({ ...item, cost: (item.price || 0) / 1.18 })
        } else {
            setItem({ ...item, cost: (item.price || 0) })
        }
    }, [item.price, item.taxable])

    return <form className="border rounded-md p-6 shadow-sm flex flex-col gap-5 h-fit">
        <h4 className="font-semibold mb-1 text-sm">Información base:</h4>
        <div className="grid grid-cols-12 gap-4">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-7">
                <label className="font-semibold" htmlFor="name">Nombre</label>
                <input className="border rounded-md py-1.5 px-3 outline-none" autoComplete="off" id="name" name="name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-5">
                <label className="font-semibold truncate max-w-36" htmlFor="subtype">Unidad de medida</label>
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer" id="um" name="um" value={item.um} onChange={(e) => setItem({ ...item, um: e.target.value as UM })}>
                    <option value="unit">Unidad</option>
                    <option value="kilogram">Kilogramo</option>
                    <option value="liter">Litro</option>
                    <option value="ounce">Onza</option>
                </select>
            </fieldset>
        </div>
        <div className="grid grid-cols-12 gap-4">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold" htmlFor="subtype">Tipo</label>
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer" id="subtype" name="subtype" value={item.subtype} onChange={(e) => setItem({ ...item, subtype: e.target.value as ItemSubtype })}>
                    {getSubtypesByType(item.type).map(subtype => <option key={subtype} value={subtype}>{getItemSubtypeName(subtype as ItemSubtype)}</option>)}
                </select>
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold" htmlFor="category_id">Categoría</label>
                <CategorySelect initialCategory={item.category_id} type={item.type} onChange={(e) => setItem({ ...item, category_id: e })} />
            </fieldset>
        </div>
        {((item.type === "product" && item.subtype === "unprocessed" && item.um === "unit") || (item.type === "supply" && item.subtype === "ingredient" && item.um === "unit")) && <div className="flex flex-col gap-2 mb-2">
            <h5 className="font-semibold mb-1 text-sm flex items-center gap-2">Equivalencia <QuestionCircle /></h5>
            <button className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
                Agregar equivalencia
            </button>
        </div>}
        <div className="grid grid-cols-12 gap-4">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-7">
                <label className="font-semibold" htmlFor="code">Código</label>
                <input className="border rounded-md py-1.5 px-3 outline-none" id="code" maxLength={20} name="code" value={item.code} placeholder="Opcional" onChange={(e) => setItem({ ...item, code: e.target.value })} />
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-5">
                <label className="font-semibold truncate line-clamp-1" htmlFor="status">Estado</label>
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer" id="status" name="status" value={item.status} onChange={(e) => setItem({ ...item, status: e.target.value })}>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                </select>
            </fieldset>
        </div>
        <div className="grid grid-cols-12 gap-4 border-t pt-6 mt-2 border-dashed">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-5">
                <label className="font-semibold truncate line-clamp-1" htmlFor="price">Precio</label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-32" type="number" min={0} step={1} id="price" name="price" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.valueAsNumber })} />
                </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-7">
                <label className="font-semibold truncate line-clamp-1 flex items-center gap-2" htmlFor="cost">Costo <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-32" type="number" id="cost" name="cost" value={item.cost.toFixed(2)} disabled />
                </div>
            </fieldset>
        </div>
        <div className="grid grid-cols-12 gap-4">
            <fieldset className="flex items-center gap-2 text-sm col-span-7">
                <input className="cursor-pointer" id="taxable" type="checkbox" checked={item.taxable} onChange={(e) => setItem({ ...item, taxable: e.target.checked })} />
                <label className="font-semibold cursor-pointer" htmlFor="taxable">Afecto a impuestos</label>
            </fieldset>
        </div>
        <div className="grid grid-cols-12 border-t pt-6 mt-2 border-dashed">
            <fieldset className="grid grid-cols-1 col-span-5 gap-1 text-sm">
                <label className="font-semibold flex items-center gap-2" htmlFor="waste">Merma <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <span>%</span>
                    <input className="border rounded-md py-1.5 px-3 outline-none w-24 mr-2" type="number" min={0} max={100} maxLength={3} step={1} id="waste" name="waste" value={item.waste} onChange={(e) => setItem({ ...item, waste: e.target.valueAsNumber > 100 ? item.waste : e.target.valueAsNumber })} />
                </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 col-span-7 gap-1 text-sm">
                <label className="font-semibold flex items-center gap-2" htmlFor="clean-cost">Costo sin merma <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-32 mr-2" type="number" disabled id="clean-cost" name="clean-cost" value={(item.cost / (1 - ((item.waste || 0) / 100))).toFixed(2)} />
                </div>
            </fieldset>
        </div>
    </form>
}