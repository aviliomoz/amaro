import { Page } from "../components/ui/Page"
import { RestaurantLink } from "../components/RestaurantLink"

export const SettingsPage = () => {
    return <Page title="Amaro - Ajustes del sistema">
        <Page.Header>
            <Page.Title>Ajustes del sistema</Page.Title>
        </Page.Header>
        <Page.Content>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                <RestaurantLink className="border rounded-md px-4 py-2 hover:bg-stone-100 hover:font-medium hover:shadow-sm" to={`/settings/categories?status=active&type=products`}>Categorías</RestaurantLink>
            </div>
        </Page.Content>
    </Page>
}