import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useParams } from "react-router-dom"
import { Category, APIResponse } from "@amaro-software/core"

export const useCategories = () => {
    const { restaurant } = useRestaurant()
    const { type } = useParams<{ type: string }>()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const { data: categories } = await axiosAPI.get<APIResponse<Category[]>>(`/categories?restaurant_id=${restaurant?.id}&type=${type}`)
                setCategories(categories.data)
            } catch (error) {
                toast.error("Error cargando categorias")
                console.error("Error cargando categorias:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    return { categories, loading }
}