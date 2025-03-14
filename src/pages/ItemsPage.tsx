import { ITEMS_NAV } from "../utils/items.nav"
import { useFilter } from "../hooks/useFilter"
import { SearchBar } from "../components/filters/SearchBar"
import { Plus } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { useLayoutEffect } from "react"
import { CategoriesList } from "../components/CategoriesList"
import { getItemTypeName } from "../utils/items"
import { ItemType } from "../utils/types"
import { ItemsTable } from "../components/ItemsTable"
import { BranchLink } from "../components/BranchLink"
import { useParams } from "react-router-dom"

export const ItemsPage = () => {

    const { type } = useParams()
    const [subtype, setSubtype] = useFilter("subtype")

    useLayoutEffect(() => {
        const currentType = ITEMS_NAV.find(itemNav => itemNav.value === type)!

        if (!currentType.types.some(st => st.value === subtype)) {
            setSubtype("")
        }
    }, [type])

    return <>
        <title>Garlink - Gestión de ítems</title>
        <section className="">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h2 className="text-lg font-semibold">Ítems</h2>
                    <nav className="flex items-center gap-3 text-sm">
                        {ITEMS_NAV.map(itemNav => <BranchLink to={`/items/${itemNav.value}`} className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${type === itemNav.value
                            ? "bg-stone-900 text-white"
                            : "hover:bg-stone-200"
                            }`} key={itemNav.value}>
                            <itemNav.icon className={`size-4 ${type === itemNav.value ? "stroke-white" : ""}`} />
                            {itemNav.name}
                        </BranchLink>)}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <DownloadButton />
                    <BranchLink to={`/items/${type}/new`} className={`bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-2.5 sm:px-4 py-1.5 flex items-center gap-2 min-w-max shadow-sm text-sm text-white font-medium`}><Plus className="size-4 stroke-white stroke-[3px]" />{`Crear ${getItemTypeName(type as ItemType).toLowerCase()}`}</BranchLink>
                </div>
            </div>
            <div className="flex items-center mt-4 justify-between border rounded-md p-4">
                <div className="flex items-center gap-5">
                    <nav className="flex items-center gap-3 text-sm">
                        {ITEMS_NAV.find(itemNav => type === itemNav.value)!.types.map(itemType => <button key={itemType.value} onClick={() => setSubtype(itemType.value)} className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${subtype === itemType.value
                            ? "bg-stone-900 text-white"
                            : "hover:bg-stone-200"
                            }`}>{itemType.name}</button>)}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <StatusFilter />
                    <SearchBar placeholder={`Buscar ${getItemTypeName(type as ItemType).toLowerCase()}`} />
                </div>
            </div>
            <div className="flex mt-4 gap-4">
                <CategoriesList />
                <ItemsTable />
            </div>
        </section>
    </>
}