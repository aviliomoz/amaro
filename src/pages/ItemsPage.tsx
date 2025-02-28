import { ITEMS_NAV } from "../utils/items.nav"
import { useFilter } from "../hooks/useFilter"
import { SearchBar } from "../components/filters/SearchBar"
import { Plus } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { useLayoutEffect } from "react"
import { CategoriesList } from "../components/CategoriesList"
import { ProductsTable } from "../components/tables/ProductsTable"
import { CombosTable } from "../components/tables/CombosTable"
import { SuppliesTable } from "../components/tables/SuppliesTable"
import { BaseRecipesTable } from "../components/tables/BaseRecipesTable"
import { BranchLink } from "../components/BranchLink"

export const ItemsPage = () => {

    const [type, setType] = useFilter("type", "product")
    const [subtype, setSubtype] = useFilter("subtype", "all")

    useLayoutEffect(() => {
        const currentType = ITEMS_NAV.find(itemNav => itemNav.value === type)!

        if (!currentType.types.some(st => st.value === subtype)) {
            setSubtype("all")
        }
    }, [type])

    return <>
        <title>Garlink - Gestión de ítems</title>
        <section className="">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h2 className="text-lg font-semibold">Ítems</h2>
                    <nav className="flex items-center gap-3 text-sm">
                        {ITEMS_NAV.map(itemNav => <button className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${type === itemNav.value
                            ? "bg-stone-900 text-white"
                            : "hover:bg-stone-200"
                            }`} key={itemNav.value} onClick={() => setType(itemNav.value)}>
                            <itemNav.icon className={`size-4 ${type === itemNav.value ? "stroke-white" : ""}`} />
                            {itemNav.name}
                        </button>)}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <DownloadButton />
                    <BranchLink
                        to={`/items/new?type=${type}&subtype=${subtype === "all" ? ITEMS_NAV.find(itemNav => itemNav.value === type)?.types[1].value : subtype}`}
                        className={`bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-2.5 sm:px-4 py-1.5 flex items-center gap-2 min-w-max shadow-sm text-sm text-white font-medium`}
                    ><Plus className="size-4 stroke-white stroke-[3px]" /> Nuevo ítem
                    </BranchLink>
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
                    <SearchBar placeholder="Buscar ítem" />
                </div>
            </div>
            <div className="flex mt-4 gap-4">
                <CategoriesList />
                {type === "product" && <ProductsTable />}
                {type === "combo" && <CombosTable />}
                {type === "supply" && <SuppliesTable />}
                {type === "base-recipe" && <BaseRecipesTable />}
            </div>
        </section>
    </>
}