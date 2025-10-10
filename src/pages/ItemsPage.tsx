import { SearchBar } from "../components/filters/SearchBar"
import { Beef, CookingPot, Layers3, Plus, Salad } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { CategoriesList } from "../components/CategoriesList"
import { getItemSubtypeName, getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemsTable } from "../components/ItemsTable"
import { RestaurantLink } from "../components/RestaurantLink"
import { ItemTypeEnum } from "../utils/types"
import { useParams } from "react-router-dom"
import { Page } from "../components/ui/Page"
import { ItemTypeLink } from "../components/filters/ItemTypeLink"
import { ItemSubtypeFilter } from "../components/filters/ItemSubtypeFilter"

export const ItemsPage = () => {

    const { type } = useParams<{ type: ItemTypeEnum }>()

    return <Page title="Amaro - Gestión de ítems">
        <Page.Header>
            <div className="flex items-center gap-6">
                <Page.Title>Ítems</Page.Title>
                <nav className="flex items-center gap-3 text-sm">
                    <ItemTypeLink base="/items/products" url="/items/products?status=active" icon={Salad} >Productos</ItemTypeLink>
                    <ItemTypeLink base="/items/combos" url="/items/combos?status=active" icon={Layers3} >Combos</ItemTypeLink>
                    <ItemTypeLink base="/items/supplies" url="/items/supplies?status=active" icon={Beef} >Insumos</ItemTypeLink>
                    <ItemTypeLink base="/items/base-recipes" url="/items/base-recipes?status=active" icon={CookingPot} >Recetas base</ItemTypeLink>
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <DownloadButton />
                <RestaurantLink to={`/items/${type}/new`} className={`bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-2.5 sm:px-4 py-1.5 flex items-center gap-2 min-w-max shadow-sm text-sm text-white font-medium hover:from-orange-500 hover:to-orange-500 hover:border-orange-500`}><Plus className="size-4 stroke-white stroke-[3px]" />{`Crear ${getItemTypeName(type!).toLowerCase()}`}</RestaurantLink>
            </div>
        </Page.Header>
        <div className="flex items-center justify-between border rounded-md p-4">
            <div className="flex items-center gap-5">
                <nav className="flex items-center gap-3 text-sm">
                    <ItemSubtypeFilter value={null} >Todo</ItemSubtypeFilter>
                    {getSubtypesByType(type!).map(subtype => <ItemSubtypeFilter key={subtype} value={subtype} >{getItemSubtypeName(subtype)}</ItemSubtypeFilter>)}
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <StatusFilter />
                <SearchBar placeholder={`Buscar ${getItemTypeName(type!).toLowerCase()}`} />
            </div>
        </div>
        <div className="flex mt-4 gap-4">
            <CategoriesList />
            <ItemsTable />
        </div>
    </Page>
}