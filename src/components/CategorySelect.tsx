import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { APIResponse, Category } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useParams } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

type Props = {
    onChange: (category_id: string) => void
    initialCategory: string
    type: string
}

export const CategorySelect = ({ initialCategory, onChange, type }: Props) => {

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { brand_id } = useParams()

    useEffect(() => {

        setLoading(true)

        const getCategories = async () => {
            try {
                const { data } = await axiosAPI.get<APIResponse<Category[]>>(`/categories/${brand_id}/${type}`)
                setCategories(data.data)
            } catch (error) {
                toast.error("Error al cargar las categorias")
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [])

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <select value={initialCategory} onChange={e => onChange(e.target.value)} className="border rounded-md w-full px-2 py-1">
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>
}