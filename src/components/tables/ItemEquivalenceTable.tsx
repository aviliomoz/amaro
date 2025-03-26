import { useEffect, useState } from "react"
import { EquivalenceType, UMEnum } from "../../utils/types"
import { Trash } from "lucide-react"

type Props = {
    equivalence: EquivalenceType | null,
    setEquivalence: (equivalence: EquivalenceType | null) => void
}

export const ItemEquivalenceTable = ({ equivalence, setEquivalence }: Props) => {

    const [showTable, setShowTable] = useState<boolean>(false)

    useEffect(() => {
        if (equivalence) {
            setShowTable(true)
        } else {
            setShowTable(false)
        }
    }, [equivalence])

    return <>
        {(!showTable) ? <button onClick={() => setShowTable(true)} className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
            Agregar equivalencia
        </button> :
            <div className="border rounded-md p-4 text-sm flex items-center gap-4 w-full">
                <p className="min-w-fit"><strong>1 unidad</strong> del ítem equivale a </p>
                <input className="border rounded-md px-4 py-1 w-24" type="number" min={0} value={equivalence?.amount} onChange={(e) => setEquivalence({ ...equivalence!, amount: e.target.valueAsNumber })} />
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer disabled:cursor-not-allowed w-full" id="um" name="um" value={equivalence?.um || "kilogram"} onChange={(e) => setEquivalence({ ...equivalence!, um: e.target.value as UMEnum })}>
                    <option value="kilogram">{`Kilogramo${equivalence?.amount! !== 1 ? "s" : ""}`}</option>
                    <option value="liter">{`Litro${equivalence?.amount! !== 1 ? "s" : ""}`}</option>
                    <option value="ounce">{`Onza${equivalence?.amount! !== 1 ? "s" : ""}`}</option>
                </select>
                <button onClick={() => setEquivalence(null)} className="ml-2"><Trash className="size-4 stroke-stone-300 hover:stroke-red-400" /></button>
            </div>}
    </>
}