import { Table } from "./ui/Table"
import { StatusTag } from "./ui/StatusTag"
import { ItemType } from "../utils/types"
import { useState } from "react"
import { useItem } from "../contexts/ItemContext"

type Props = {
    derivative: ItemType
}

export const DerivativeRow = ({ derivative }: Props) => {

    const { derivatives, setDerivatives } = useItem()
    const [mode, setMode] = useState<"show" | "edit">("show")
    const [name, setName] = useState<string>(derivative.name)

    const updateDerivativeName = (name: string) => {
        const newDerivative = { ...derivative, name }
        setDerivatives(derivatives.map((d) => d.id === derivative.id ? newDerivative : d))
        setMode("show")
    }

    const toggleDerivativeStatus = () => {
        setDerivatives(derivatives.map((d) => d.id === derivative.id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d))
        setMode("show")
    }

    const handleCancel = () => {
        setName(derivative.name)
        setMode("show")
    }

    return <Table.Row>
        <Table.Cell>{mode === "show" ? derivative.name : <input type="text" value={name} onChange={(e) => setName(e.target.value)} />}</Table.Cell>
        <Table.Cell>{derivative.cost_price.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</Table.Cell>
        <Table.Cell><StatusTag status={derivative.status} /></Table.Cell>
        <Table.Cell>
            {
                mode === "show" ? (
                    <div className="flex gap-2">
                        <button type="button" onClick={(e) => { e.preventDefault(); setMode("edit") }}>Editar</button>
                        <button type="button" onClick={(e) => { e.preventDefault(); toggleDerivativeStatus() }}>{derivative.status === "active" ? "Desactivar" : "Activar"}</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => updateDerivativeName(name)}>Guardar</button>
                        <button onClick={() => handleCancel()}>Cancelar</button>
                    </div>
                )
            }
        </Table.Cell>
    </Table.Row>
}