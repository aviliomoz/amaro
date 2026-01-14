import { useParams } from "react-router-dom"
import { ItemType, getItemTypeName } from "@amaro-software/core"
import { ItemForm } from "../components/ItemForm"
import { ItemContextProvider } from "../contexts/ItemContext"
import { ItemSaveButton } from "../components/ItemSaveButton"
import { Page } from "../components/ui/Page"
import { GoBackButton } from "../components/GoBackButton"
import { useRestaurant } from "../contexts/RestaurantContext"

export const ItemPage = () => {

    const { restaurant } = useRestaurant()
    const { type, id } = useParams<{ type: ItemType, id: string }>()
    const title: string = `${id === "new" ? "Nuevo" : "Editar"} ${getItemTypeName(type!).toLowerCase()}`

    return <ItemContextProvider>
        <Page title={`Amaro - ${title}`}>
            <Page.Header>
                <Page.Title>{`${title}:`}</Page.Title>
                <div className="flex items-center gap-6">
                    <GoBackButton url={`/restaurants/${restaurant?.slug}/items/${type}?status=active`} />
                    <ItemSaveButton />
                </div>
            </Page.Header>
            <ItemForm />
        </Page>
    </ItemContextProvider>
}