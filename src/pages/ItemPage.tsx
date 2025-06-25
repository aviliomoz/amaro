import { useParams } from "react-router-dom"
import { ItemTypeEnum } from "../utils/types"
import { getItemTypeName } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { ItemContextProvider } from "../contexts/ItemContext"
import { ItemSaveButton } from "../components/ItemSaveButton"
import { Page } from "../components/ui/Page"
import { GoBackButton } from "../components/GoBackButton"

export const ItemPage = () => {

    const { type, id } = useParams<{ type: ItemTypeEnum, id: string }>()
    const title: string = `${id === "new" ? "Nuevo" : "Editar"} ${getItemTypeName(type!).toLowerCase()}`

    return <ItemContextProvider>
        <Page title={`Amaro - ${title}`}>
            <Page.Header>
                <Page.Title>{`${title}:`}</Page.Title>
                <div className="flex items-center gap-6">
                    <GoBackButton />
                    <ItemSaveButton />
                </div>
            </Page.Header>
            <ItemForm />
        </Page>
    </ItemContextProvider>
}