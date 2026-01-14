import toast from "react-hot-toast"
import { createContext, useContext, useEffect, useState } from "react"
import { axiosAPI } from "../libs/axios"
import { useNavigate, useParams } from "react-router-dom"
import { useRestaurant } from "./RestaurantContext"
import { useCategories } from "../hooks/useCategories"
import { ItemIngredientDto, Item, ItemType, APIResponse, getSubtypesByType, getIngredientCost } from "@amaro-software/core"

type ItemContextProps = {
    item: Item,
    setItem: (item: Item) => void,
    saveItem: () => Promise<void>,
    recipe: ItemIngredientDto[],
    setRecipe: (recipe: ItemIngredientDto[]) => void,
    loading: boolean,
    saving: boolean,
}

export const ItemContext = createContext<ItemContextProps | undefined>(undefined)

export const ItemContextProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate()
    const { type, id } = useParams<{ type: ItemType, id: string }>()
    const { restaurant } = useRestaurant()
    const { categories } = useCategories()
    const [item, setItem] = useState<Item>({
        id: "",
        internal_code: null,
        external_code: null,
        name: "",
        type: type!,
        subtype: getSubtypesByType(type!)[0],
        category_id: categories[0]?.id!,
        um: "unit",
        taxable: true,
        yield: 1,
        restaurant_id: restaurant?.id!,
        discharge_type: "unit",
        sale_price: 0,
        purchase_price: 0,
        cost_price: 0,
        cost_percentage: 32,
        equivalence_um: null,
        equivalence_amount: null,
        status: "active",
    })

    const [recipe, setRecipe] = useState<ItemIngredientDto[]>([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const getItem = async () => {
            setLoading(true)
            try {

                const [{ data: item }, { data: recipe }] = await Promise.all([
                    axiosAPI.get<APIResponse<Item>>(`/items/${id}`),
                    axiosAPI.get<APIResponse<ItemIngredientDto[]>>(`/items/ingredients/${id}`),
                ])

                setItem(item.data)
                setRecipe(recipe.data.sort((a, b) => a.name.localeCompare(b.name)))
            } catch (error) {
                console.error("Error fetching item:", error)
            } finally {
                setLoading(false)
            }
        }

        if (id && id !== "new") {
            getItem()
        }
    }, [id])

    const saveItem = async () => {
        setSaving(true)
        try {
            console.log("Saving item...", item, recipe)
            if (id === "new") {
                const { data: savedItem } = await axiosAPI.post<APIResponse<Item>>(`/items`, { ...item, name: item.name.trim() })
                await axiosAPI.put(`/items/ingredients/${savedItem.data.id}`, recipe)
                toast.success(`Ítem creado`)
            } else {
                await axiosAPI.put(`/items/${id}`, { ...item, name: item.name.trim() })
                await axiosAPI.put(`/items/ingredients/${id}`, recipe)
                toast.success(`Ítem actualizado`)
            }

            navigate(`/restaurants/${restaurant?.slug}/items/${item.type}?status=active`)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {
        if ((item.type === "products" && item.subtype === "transformed") || item.type === "base-recipes") {
            setItem({ ...item, cost_price: recipe.reduce((acc, ingr) => acc + (getIngredientCost(ingr) / item.yield), 0) })
        }
    }, [recipe])

    return (
        <ItemContext.Provider value={{ item, setItem, saveItem, recipe, setRecipe, loading, saving }}>
            {children}
        </ItemContext.Provider>
    )
}

export const useItem = () => {
    const context = useContext(ItemContext);

    if (!context) {
        throw new Error("useItem must be within ItemContextProvider");
    }

    return context;
};
