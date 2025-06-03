import toast from "react-hot-toast"
import { useState } from "react"
import { APIResponse, IngredientType, UMEnum } from "../utils/types"
import { LoaderCircle, Trash } from "lucide-react"
import { useItem } from "../contexts/ItemContext"
import { axiosAPI } from "../libs/axios"
import { ShowButton } from "./ui/ShowButton"

export const ItemEquivalenceOption = () => {

    const { item, setItem } = useItem()
    const [searching, setSearching] = useState<boolean>(false)

    const open = () => {
        setItem({ ...item, has_equivalence: true, equivalence_amount: item.equivalence_amount || 1, equivalence_um: item.equivalence_um || "kilogram" })
    }

    const deleteEquivalence = async () => {
        try {

            setSearching(true)

            const { data: uses } = await axiosAPI.get<APIResponse<IngredientType[]>>(`/ingredients/uses/${item.id}`)
            const equivalenceUses = uses.data.filter(use => use.um !== item.um)

            console.log("equivalenceUses", uses.data)

            if (equivalenceUses.length > 0) {
                return toast.error("No se puede eliminar la equivalencia porque es utilizada en las siguientes recetas: " + equivalenceUses.map(use => use.name).join(", ") + ".")
            }

            setItem({ ...item, has_equivalence: false, equivalence_amount: null, equivalence_um: null })
        } catch (error) {
            console.error("Error deleting equivalence:", error)
        } finally {
            setSearching(false)
        }
    }

    if (!item.has_equivalence) return <ShowButton onClick={open}>Agregar equivalencia</ShowButton>

    return <div className="border rounded-md p-4 text-sm flex items-center gap-4 w-full">
        <p className="min-w-fit"><strong>1 unidad</strong> del ítem equivale a </p>
        <input className="border rounded-md px-4 py-1 w-24" type="number" min={0} value={item.equivalence_amount!} onChange={(e) => setItem({ ...item, equivalence_amount: e.target.valueAsNumber })} />
        <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer disabled:cursor-not-allowed w-full" id="um" name="um" value={item.equivalence_um || "kilogram"} onChange={(e) => setItem({ ...item, equivalence_um: e.target.value as UMEnum })}>
            <option value="kilogram">{`Kilogramo${item.equivalence_amount !== 1 ? "s" : ""}`}</option>
            <option value="liter">{`Litro${item.equivalence_amount !== 1 ? "s" : ""}`}</option>
            <option value="ounce">{`Onza${item.equivalence_amount !== 1 ? "s" : ""}`}</option>
        </select>
        <button type="button" onClick={deleteEquivalence} className="ml-2">
            {searching ? <LoaderCircle className="size-4 stroke-red-400 animate-spin" /> : <Trash className="size-4 stroke-stone-300 hover:stroke-red-400" />}
        </button>
    </div>
}