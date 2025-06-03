import { useEffect, useState } from "react"
import { APIResponse, CategoryType } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useParams } from "react-router-dom"

export const useCategories = () => {
    const {restaurant} = useRestaurant()
    const {type} = useParams<{ type: string }>()
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const {data: categories} = await axiosAPI.get<APIResponse<CategoryType[]>>(`/categories/${restaurant?.id}/${type}`)
                setCategories(categories.data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    return { categories, loading }
}