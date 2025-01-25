import { Link, Navigate, Outlet, useLocation } from "react-router-dom"
import { ITEMS_NAV } from "../utils/items.nav"
import { useFilter } from "../hooks/useFilter"
import { SearchBar } from "../components/filters/SearchBar"
import { LinkButton } from "../components/ui/LinkButton"
import { Plus } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"

export const ItemsLayout = () => {

    const location = useLocation()
    const [type, setType] = useFilter("type", "all")

    if (location.pathname === "/items") return <Navigate to="/items/products" />

    return <section className="pl-6 pt-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <h2 className="text-lg font-semibold">Ítems:</h2>
                <nav className="flex items-center gap-3 text-sm">
                    {ITEMS_NAV.map(itemNav => <Link className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${location.pathname.includes(itemNav.url)
                        ? "bg-stone-900 text-white"
                        : "hover:bg-stone-200"
                        }`} to={itemNav.url} key={itemNav.url}>
                        <itemNav.icon className={`size-4 ${location.pathname.includes(itemNav.url) ? "stroke-white" : ""}`} />
                        {itemNav.name}
                    </Link>)}
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <DownloadButton />
                <LinkButton icon={Plus} url={location.pathname + "/new"}>{`Nuevo ${ITEMS_NAV.find(itemNav => location.pathname.includes(itemNav.url))!.name.toLowerCase().slice(0, -1)}`}</LinkButton>
            </div>
        </div>
        <div className="flex items-center mt-4 justify-between border rounded-md p-4">
            <div className="flex items-center gap-5">
                <h4 className="text-sm font-medium">Tipo:</h4>
                <nav className="flex items-center gap-3 text-sm">
                    {ITEMS_NAV.find(itemNav => location.pathname.includes(itemNav.url))!.types.map(itemType => <button key={itemType.value} onClick={() => setType(itemType.value)} className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${type === itemType.value
                        ? "bg-stone-900 text-white"
                        : "hover:bg-stone-200"
                        }`}>{itemType.name}</button>)}
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <StatusFilter />
                <SearchBar />
            </div>
        </div>
        <Outlet />
    </section>
}