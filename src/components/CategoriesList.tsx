import toast from "react-hot-toast"
import { LoaderCircle, Settings2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Modal } from "./ui/Modal"
import { CategoriesForm } from "./CategoriesForm"
import { useFilter } from "../hooks/useFilter"
import { APIResponse, Category } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"

export const CategoriesList = () => {

    const [type] = useFilter("type")
    const [category, setCategory] = useFilter("category")
    const { brand } = useRestaurant()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {

        if (category !== "") {
            setCategory("")
        }

        const getCategories = async () => {
            try {
                setLoading(true)
                const { data } = await axiosAPI<APIResponse<Category[]>>(`/categories/${brand?.id}/${type || "product"}`)
                setCategories(data.data)
            } catch (error) {
                toast.error("Error al cargar las categorias")
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [type])

    return <div className="border rounded-md p-4 min-w-48 max-w-48 h-fit">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Categorías</h3>
            <button onClick={() => setShowModal(true)} className="bg-stone-100 hover:bg-stone-200 hover:border-stone-300 rounded-md border flex size-6 items-center justify-center">
                <Settings2 className="size-3" />
            </button>
        </div>
        {loading ? <LoaderCircle className='mt-4 size-4 animate-spin stroke-orange-500' /> : <ul className="flex flex-col gap-1 mt-4">
            <button onClick={() => setCategory("")} className={`text-sm ${category === "" && "bg-stone-50 border"} px-2.5 py-1 rounded-md font-medium text-left`}>Todas</button>
            {categories.map(cat => <button onClick={() => setCategory(cat.id)} key={cat.id} className={`text-sm px-2.5 py-1 truncate text-left ${category === cat.id && "bg-stone-50 border rounded-md"}`}>{cat.name}</button>)}
        </ul>}
        {showModal && <Modal close={() => setShowModal(false)}>
            <CategoriesForm close={() => setShowModal(false)} />
        </Modal>}
    </div>
}