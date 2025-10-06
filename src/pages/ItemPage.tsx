import { useParams } from "react-router-dom"
import { ItemTypeEnum } from "../utils/types"
import { getItemTypeName } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { ItemContextProvider } from "../contexts/ItemContext"
import { ItemSaveButton } from "../components/ItemSaveButton"
import { Page } from "../components/ui/Page"
import { GoBackButton } from "../components/GoBackButton"
import { useRestaurant } from "../contexts/RestaurantContext"

export const ItemPage = () => {

    const {restaurant} = useRestaurant()
    const { type, id } = useParams<{ type: ItemTypeEnum, id: string }>()
    const title: string = `${id === "new" ? "Nuevo" : "Editar"} ${getItemTypeName(type!).toLowerCase()}`

    return <ItemContextProvider>
        <Page title={`Amaro - ${title}`}>
            <Page.Header>
                <Page.Title>{`${title}:`}</Page.Title>
                <div className="flex items-center gap-6">
                    <GoBackButton url={`/restaurants/${restaurant?.slug}/items/${type}?status=active&page=1`}/>
                    <ItemSaveButton />
                </div>
            </Page.Header>
            <ItemForm />
        </Page>
    </ItemContextProvider>
}