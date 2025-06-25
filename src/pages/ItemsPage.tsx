import { SearchBar } from "../components/filters/SearchBar"
import { Beef, CookingPot, Layers3, Plus, Salad } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { CategoriesList } from "../components/CategoriesList"
import { getItemSubtypeName, getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemsTable } from "../components/ItemsTable"
import { RestaurantLink } from "../components/RestaurantLink"
import { ItemTypeLink } from "../components/ItemTypeLink"
import { SubtypeFilter } from "../components/filters/SubtypeFilter"
import { ItemTypeEnum } from "../utils/types"
import { useParams } from "react-router-dom"
import { Page } from "../components/ui/Page"

export const ItemsPage = () => {

    const { type } = useParams<{ type: ItemTypeEnum }>()

    return <Page title="Amaro - Gestión de ítems">
        <Page.Header>
            <div className="flex items-center gap-6">
                <Page.Title>Ítems</Page.Title>
                <nav className="flex items-center gap-3 text-sm">
                    <ItemTypeLink url="/items/products" icon={Salad} >Productos</ItemTypeLink>
                    <ItemTypeLink url="/items/combos" icon={Layers3} >Combos</ItemTypeLink>
                    <ItemTypeLink url="/items/supplies" icon={Beef} >Insumos</ItemTypeLink>
                    <ItemTypeLink url="/items/base-recipes" icon={CookingPot} >Recetas base</ItemTypeLink>
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
                    <SubtypeFilter value={null} >Todo</SubtypeFilter>
                    {getSubtypesByType(type!).map(subtype => <SubtypeFilter key={subtype} value={subtype} >{getItemSubtypeName(subtype)}</SubtypeFilter>)}
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