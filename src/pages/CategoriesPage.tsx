import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { Modal } from "../components/ui/Modal"
import { Page } from "../components/ui/Page"
import { useFilter } from "../hooks/useFilter"
import { StatusFilter } from "../components/filters/StatusFilter"
import { SearchBar } from "../components/filters/SearchBar"
import { Plus } from "lucide-react"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { CategoryCard } from "../components/CategoryCard"
import { Loading } from "../components/ui/Loading"
// import { CategoriesForm } from "../components/CategoriesForm"
import { Category, ItemStatus, ItemType, APIResponse } from "@amaro-software/core"

export const CategoriesPage = () => {

    const { restaurant } = useRestaurant()
    const [type, setType] = useFilter<ItemType>("type")
    const [status] = useFilter<ItemStatus>("status")
    const [search] = useFilter<string>("search")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                let url = `/categories?restaurant_id=${restaurant?.id}`
                const { data: categories } = await axiosAPI.get<APIResponse<Category[]>>(url)
                setCategories(categories.data)
            } catch (error) {
                toast.error("Error fetching categories: " + (error as Error).message)
                console.error("Error fetching categories:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        const filterCategories = () => {
            let filtered = categories.filter(category => category.type === type)

            if (status) {
                filtered = filtered.filter(category => category.status === status)
            }

            if (search) {
                filtered = filtered.filter(category => category.name.toLowerCase().includes(search.toLowerCase()))
            }

            setFilteredCategories(filtered)
        }
        filterCategories()
    }, [categories, type, status, search])

    return <Page title="Amaro - Gestión de categorías">
        <Page.Header>
            <Page.Title>Gestión de categorías</Page.Title>

        </Page.Header>
        <Page.Content>
            <div className="flex items-center gap-4 w-full mb-6 justify-between">
                <label className="font-semibold flex items-center gap-4 min-w-fit">Tipo de categoría:
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ItemType)}
                        className="border rounded-md px-2 py-1.5 shadow-sm cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-stone-100"
                    >
                        <option value="products">Productos</option>
                        <option value="combos">Combos</option>
                        <option value="supplies">Insumos</option>
                        <option value="base-recipes">Recetas base</option>
                    </select>
                </label>
                <div className="flex items-center gap-4">
                    <StatusFilter />
                    <SearchBar placeholder="Buscar categoría" />
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md min-w-fit font-medium flex items-center gap-2"
                    ><Plus className="size-4 stroke-white stroke-[3px]" />Nueva categoría</button>
                </div>
            </div>
            {loading ? <Loading /> : (
                <>
                    {
                        filteredCategories.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredCategories.map(category => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        ) : <p className="text-sm">No hay categorías disponibles</p>
                    }
                </>
            )}
            {showModal &&
                <Modal close={() => setShowModal(false)}>
                    {/* <CategoriesForm /> */}
                    <></>
                </Modal>}
        </Page.Content>
    </Page>
}