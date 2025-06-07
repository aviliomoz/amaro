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
            <section className="grid grid-cols-5 w-full gap-4 bg-stone-100 p-4 rounded-md shadow-sm items-start justify-start">
                {restaurants.sort((a, b) => a.name.localeCompare(b.name)).map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
            </section>
        </Page.Content>
    </Page>
}