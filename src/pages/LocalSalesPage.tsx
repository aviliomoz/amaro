import { Link } from "react-router-dom"
import { Page } from "../components/ui/Page"
import { useFilter } from "../hooks/useFilter"

export const LocalSalesPage = () => {

    const [hall, setHall] = useFilter("hall")

    return <Page title="Ventas Locales">
        <Page.Header>
            <div className="flex items-center gap-6 mt-2">
                <ul className="flex items-center gap-2 text-sm">
                    <button className={`border px-3 py-1 rounded-md ${hall === "salon" || !hall ? "bg-stone-900 text-white border-stone-900 shadow-sm font-medium" : ""}`} onClick={() => setHall("salon")}>Salon</button>
                    <button className={`border px-3 py-1 rounded-md ${hall === "terraza" ? "bg-stone-900 text-white border-stone-900 shadow-sm font-medium" : ""}`} onClick={() => setHall("terraza")}>Terraza</button>
                    <button className={`border px-3 py-1 rounded-md ${hall === "barra" ? "bg-stone-900 text-white border-stone-900 shadow-sm font-medium" : ""}`} onClick={() => setHall("barra")}>Barra</button>
                </ul>
            </div>
        </Page.Header>
        <Page.Content>
            <div className="grid grid-cols-10 gap-3">
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S01</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S02</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S03</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S04</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S05</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S06</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S07</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S08</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S09</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S10</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S11</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S12</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S13</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S14</div></Link>
                <Link to={"/"}><div className="h-20 border rounded-md bg-stone-50 font-medium flex justify-center items-center hover:bg-stone-100 hover:shadow-sm">S15</div></Link>
            </div>
        </Page.Content>
    </Page>
}