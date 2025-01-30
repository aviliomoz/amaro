import toast from "react-hot-toast"
import { useLayoutEffect, useState } from "react"
import { LinkButton } from "../components/ui/LinkButton"
import { Plus } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { APIResponse, Restaurant } from "../utils/types"
import { RestaurantCard } from "../components/RestaurantCard"

export const RestaurantsPage = () => {

    const { user } = useAuth()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getRestaurants = async () => {
            try {
                const { data } = await axiosAPI<APIResponse<Restaurant[]>>(`/restaurants?userId=${user?.id}`)
                setRestaurants(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getRestaurants()
    }, [])

    return <section className="bg-stone-50 h-screen rounded-lg p-6">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Tus restaurantes:</h2>
            <LinkButton icon={Plus} url="/restaurants/new">Nuevo restaurante</LinkButton>
        </div>
        {loading
            ? <p>Cargando restaurantes...</p>
            : <ul className="flex gap-3 mt-4">
                {restaurants.sort((a, b) => a.name.localeCompare(b.name)).map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
            </ul>
        }
    </section>
}