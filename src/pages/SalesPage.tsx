import { Page } from "../components/ui/Page"
import { ItemTypeLink } from "../components/filters/ItemTypeLink"
import { Box, LayoutGrid, Plus } from "lucide-react"
import { Outlet } from "react-router-dom"
import { RestaurantLink } from "../components/RestaurantLink"

export const SalesPage = () => {

    return <Page title="Ventas">
        <Page.Header>
            <div className="flex items-center gap-6">
                <Page.Title>Ventas</Page.Title>
                <ul className="flex items-center gap-3 text-sm">
                    <ItemTypeLink icon={LayoutGrid} url={`/sales/local`}>Local</ItemTypeLink>
                    <ItemTypeLink icon={Box} url={`/sales/delivery`}>Delivery</ItemTypeLink>
                </ul>
            </div>
            <RestaurantLink to={"/sales/new"} className={`bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-2.5 sm:px-4 py-1.5 flex items-center gap-2 min-w-max shadow-sm text-sm text-white font-medium hover:from-orange-500 hover:to-orange-500 hover:border-orange-500`}><Plus className="size-4 stroke-white stroke-[3px]" />{`Nueva venta`}</RestaurantLink>
        </Page.Header>
        <Page.Content>
            <Outlet />
        </Page.Content>
    </Page>
}