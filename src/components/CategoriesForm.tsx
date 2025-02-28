import { FormEvent, useState } from "react"

type Props = {
    close: () => void
}

export const CategoriesForm = ({close}: Props) => {

    const [name, setName] = useState<string>("")

    const handleSave = (e: FormEvent) => {
        e.preventDefault()
    }

    return <form>
        <h4 className="text-sm font-semibold mb-4">Nueva Categoría:</h4>
        <label className="text-sm">
            <span>Nombre</span>
            <input className="border rounded-md px-2.5 py-1 outline-none mt-1 w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div className="mt-4 text-sm font-medium flex items-center justify-end gap-3">
            <button onClick={() => close()} className="border rounded-md px-3 py-1">Cancelar</button>
            <button onClick={handleSave} className="bg-gradient-to-br text-white px-3 py-1 rounded-md from-orange-500 to-orange-600">Guardar</button>
        </div>
    </form>
}