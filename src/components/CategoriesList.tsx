import toast from "react-hot-toast"
import { Ellipsis, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Modal } from "./ui/Modal"
import { CategoriesForm } from "./CategoriesForm"
import { APIResponse, CategoryType, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useParams } from "react-router-dom"
import { CategoriesListItem } from "./CategoriesListItem"

export const CategoriesList = () => {

    const { type } = useParams<{type: ItemTypeEnum}>()
    const { restaurant } = useRestaurant()
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {

        const getCategories = async () => {
            try {
                setLoading(true)
                const { data } = await axiosAPI<APIResponse<CategoryType[]>>(`/categories/${restaurant?.id}/${type || "products"}`)
                setCategories(data.data)
            } catch (error) {
                toast.error("Error al cargar las categorias")
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [type])

    return <div className="border rounded-md p-4 min-w-48 max-w-48 h-fit flex flex-col">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Categorías</h3>
            <Ellipsis onClick={() => setShowModal(true)} className="size-4 stroke-stone-400 hover:stroke-stone-600 cursor-pointer" />
        </div>
        {loading ? <LoaderCircle className='mt-4 size-4 animate-spin stroke-orange-500' /> : <ul className="flex flex-col gap-1 mt-4">
            <CategoriesListItem value={null} >Todas</CategoriesListItem>
            {categories.map(cat => <CategoriesListItem value={cat.name}>{cat.name}</CategoriesListItem>)}
        </ul>}
        {showModal && <Modal close={() => setShowModal(false)}>
            <CategoriesForm close={() => setShowModal(false)} />
        </Modal>}
    </div>
}