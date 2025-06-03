import toast from "react-hot-toast"
import { useLayoutEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { APIResponse, RestaurantType } from "../utils/types"
import { RestaurantCard } from "../components/RestaurantCard"
import { Page } from "../components/ui/Page"

export const RestaurantsPage = () => {

    const { user } = useAuth()
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getRestaurants = async () => {
            try {
                const { data } = await axiosAPI<APIResponse<RestaurantType[]>>(`/restaurants?user_id=${user?.id}`)
                setRestaurants(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getRestaurants()
    }, [])

    return <Page title="Gestión de restaurantes">
        <Page.Content loading={loading}>
            <section className="bg-stone-100 shadow-sm h-screen rounded-lg p-4 grid grid-cols-4 gap-4">
                {restaurants.sort((a, b) => a.name.localeCompare(b.name)).map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
            </section>
        </Page.Content>
    </Page>
}