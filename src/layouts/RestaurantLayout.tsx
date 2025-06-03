import toast from "react-hot-toast"
import { Outlet, useParams } from "react-router-dom"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useLayoutEffect, useState } from "react"
import { axiosAPI } from "../libs/axios"
import { APIResponse, RestaurantType } from "../utils/types"
import { Loading } from "../components/ui/Loading"

export const RestaurantLayout = () => {

    const { slug } = useParams()
    const { restaurant, setRestaurant } = useRestaurant()
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getRestaurant = async () => {
            setLoading(true);
            try {
                // Obtener el restaurante usando el slug
                const { data: restaurant } = await axiosAPI.get<APIResponse<RestaurantType>>(`/restaurants/slug/${slug}`);
                setRestaurant(restaurant.data);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            getRestaurant();
        }
    }, [slug]);

    if (loading || !restaurant) return <Loading />

    return <Outlet />
}