import { Ellipsis, LoaderCircle } from "lucide-react"
import { APIResponse, CategoryType, ItemType } from "../utils/types"
import { useEffect, useState } from "react"
import { axiosAPI } from "../libs/axios"
import { CategoriesForm } from "./CategoriesForm"
import { Modal } from "./ui/Modal"

type Props = {
    category: CategoryType
}

export const CategoryCard = ({ category }: Props) => {

    const [itemNumber, setItemNumer] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        const getItemNumber = async () => {
            setLoading(true)
            try {
                const { data: items } = await axiosAPI.get<APIResponse<ItemType[]>>(`/items?category_id=${category.id}&restaurant_id=${category.restaurant_id}&type=${category.type}`)
                setItemNumer(items.data.length)
            } catch (error) {
                console.error("Error fetching item count:", error)
            } finally {
                setLoading(false)
            }
        }
        getItemNumber()
    }, [])

    return <article key={category.id} className="bg-white border p-4 rounded-md hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">{category.name}</h3>
            <Ellipsis className="size-4 stroke-stone-400 hover:stroke-stone-600 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
            </span>
            {!loading ? <span className={`text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-800`}>
                {itemNumber} {itemNumber === 1 ? "item" : "items"}
            </span> : <LoaderCircle className="size-4 animate-spin stroke-stone-300" />}
        </div>
        {showModal && <Modal close={() => setShowModal(false)}>
            <CategoriesForm category={category} />
        </Modal>}
    </article>
}