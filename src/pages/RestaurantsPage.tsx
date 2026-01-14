import toast from "react-hot-toast"
import { useLayoutEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { RestaurantCard } from "../components/RestaurantCard"
import { Page } from "../components/ui/Page"
import { Restaurant, APIResponse } from "@amaro-software/core"

export const RestaurantsPage = () => {

    const { user } = useAuth()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getRestaurants = async () => {
            try {
                const { data } = await axiosAPI<APIResponse<Restaurant[]>>(`/restaurants?user_id=${user?.id}`)
                setRestaurants(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getRestaurants()
    }, [])

    return <Page title="Amaro - Gestión de restaurantes">
        <Page.Content loading={loading}>
            <section className="grid grid-cols-5 w-full gap-4 bg-stone-100 p-4 rounded-md shadow-sm items-start justify-start">
                {restaurants.sort((a, b) => a.name.localeCompare(b.name)).map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
            </section>
        </Page.Content>
    </Page>
}