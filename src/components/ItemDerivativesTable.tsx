import { useState } from "react"
import { useItem } from "../contexts/ItemContext"
import { ShowButton } from "./ui/ShowButton"
import { Table } from "./ui/Table"
import { DerivativeRow } from "./DerivativeRow"
import { DerivativeForm } from "./DerivativeForm"
import { useFilter } from "../hooks/useFilter"

export const ItemDerivativesTable = () => {
    const { derivatives } = useItem()
    const [showInactiveDerivatives] = useFilter<string>("showInactiveDerivatives")
    const [showEditor, setShowEditor] = useState<boolean>(false)

    return <div className="flex flex-col gap-2">
        {derivatives.length > 0 && <Table>
            <Table.Header>
                <Table.Row type="header">
                    <Table.Title>Nombre</Table.Title>
                    <Table.Title>Costo</Table.Title>
                    <Table.Title>Estado</Table.Title>
                    <Table.Title>Opciones</Table.Title>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {derivatives.filter(derivative => showInactiveDerivatives === "true" ? true : derivative.status === "active").map((derivative) => (
                    <DerivativeRow key={derivative.id} derivative={derivative} />
                ))}
            </Table.Body>
        </Table>}
        {!showEditor ? <ShowButton onClick={() => setShowEditor(true)} >Agregar derivado</ShowButton> : <DerivativeForm setShowEditor={setShowEditor} />}
    </div>
}