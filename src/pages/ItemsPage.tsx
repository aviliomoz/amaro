import { ITEMS_NAV } from "../utils/items.nav"
import { useFilter } from "../hooks/useFilter"
import { SearchBar } from "../components/filters/SearchBar"
import { LinkButton } from "../components/ui/LinkButton"
import { Plus } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { useLayoutEffect } from "react"

export const ItemsPage = () => {

    const [type, setType] = useFilter("type", "product")
    const [subtype, setSubtype] = useFilter("subtype", "all")

    useLayoutEffect(() => {
        const currentType = ITEMS_NAV.find(itemNav => itemNav.value === type)!

        if (!currentType.types.some(st => st.value === subtype)) {
            setSubtype("all")
        }
    }, [type])

    return <section className="pl-6 pt-2">
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
                <LinkButton icon={Plus} url={`/items/new?type=${type}&subtype=${subtype === "all" ? ITEMS_NAV.find(itemNav => itemNav.value === type)?.types[1].value : subtype}`}>Nuevo ítem</LinkButton>
            </div>
        </div>
        <div className="flex items-center mt-4 justify-between border rounded-md p-4">
            <div className="flex items-center gap-5">
                {/* <h4 className="text-sm font-medium">Tipo:</h4> */}
                <nav className="flex items-center gap-3 text-sm">
                    {ITEMS_NAV.find(itemNav => type === itemNav.value)!.types.map(itemType => <button key={itemType.value} onClick={() => setSubtype(itemType.value)} className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${subtype === itemType.value
                        ? "bg-stone-900 text-white"
                        : "hover:bg-stone-200"
                        }`}>{itemType.name}</button>)}
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <StatusFilter />
                <SearchBar placeholder="Buscar ítem"/>
            </div>
        </div>
    </section>
}