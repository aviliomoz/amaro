import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { APIResponse, Category, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { LoaderCircle } from "lucide-react"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useParams } from "react-router-dom"

type Props = {
    category: string,
    setCategory: (category: string) => void
}

export const CategorySelect = ({ category, setCategory }: Props) => {

    const { type } = useParams<{ type: ItemTypeEnum }>()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { brand } = useRestaurant()

    useEffect(() => {

        setLoading(true)

        const getCategories = async () => {
            try {
                const { data } = await axiosAPI.get<APIResponse<Category[]>>(`/categories/${brand?.id}/${type}`)
                setCategories(data.data)
            } catch (error) {
                toast.error("Error al cargar las categorias")
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            if (category === "") {
                setCategory(categories[0].id!)
            }
        }

    }, [categories])

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-md w-full px-2 py-1">
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>
}