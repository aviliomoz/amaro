import toast from "react-hot-toast"
import { createContext, useContext, useEffect, useState } from "react"
import { APIResponse, IngredientType, ItemType, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useNavigate, useParams } from "react-router-dom"
import { getSubtypesByType } from "../utils/items"
import { useRestaurant } from "./RestaurantContext"
import { getIngredientCost } from "../utils/cost"
import { useCategories } from "../hooks/useCategories"

type ItemContextProps = {
    item: ItemType,
    setItem: (item: ItemType) => void,
    saveItem: () => Promise<void>,
    derivatives: ItemType[],
    setDerivatives: (derivatives: ItemType[]) => void,
    recipe: IngredientType[],
    setRecipe: (recipe: IngredientType[]) => void,
    loading: boolean,
    saving: boolean,
}

export const ItemContext = createContext<ItemContextProps | undefined>(undefined)

export const ItemContextProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate()
    const { type, id } = useParams<{ type: ItemTypeEnum, id: string }>()
    const { restaurant } = useRestaurant()
    const { categories } = useCategories()
    const [item, setItem] = useState<ItemType>({
        internal_code: "",
        external_code: "",
        name: "",
        type: type!,
        subtype: getSubtypesByType(type!)[0],
        category_id: categories[0]?.id!,
        um: "unit",
        taxable: true,
        yield: 1,
        waste: 0,
        restaurant_id: restaurant?.id!,
        discharge_type: "unit",
        sale_price: 0,
        purchase_price: 0,
        cost_price: 0,
        clean_price: 0,
        cost_percentage: 32,
        has_equivalence: false,
        equivalence_um: null,
        equivalence_amount: null,
        status: "active",
    })

    const [recipe, setRecipe] = useState<IngredientType[]>([])
    const [derivatives, setDerivatives] = useState<ItemType[]>([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setDerivatives(derivatives.map(derivative => (
            {
                ...derivative,
                um: item.um,
            }
        )))
    }, [item.um])

    useEffect(() => {
        const getItem = async () => {
            setLoading(true)
            try {

                const [{ data: item }, { data: recipe }, { data: derivatives }] = await Promise.all([
                    axiosAPI.get<APIResponse<ItemType>>(`/items/${id}`),
                    axiosAPI.get<APIResponse<IngredientType[]>>(`/ingredients/${id}`),
                    axiosAPI.get<APIResponse<ItemType[]>>(`/derivatives/${id}`)
                ])

                setItem(item.data)
                setRecipe(recipe.data.sort((a, b) => a.name.localeCompare(b.name)))
                setDerivatives(derivatives.data.sort((a, b) => a.name.localeCompare(b.name)))
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

            if (id === "new") {
                const { data: savedItem } = await axiosAPI.post<APIResponse<ItemType>>(`/items?restaurant_id=${restaurant?.id}`, { ...item, name: item.name.trim() })
                await axiosAPI.put(`/ingredients/${savedItem.data.id}`, recipe)
                await axiosAPI.put(`/derivatives/${savedItem.data.id}`, derivatives)
                toast.success(`Ítem creado`)
            } else {
                await axiosAPI.put(`/items/${id}?restaurant_id=${restaurant?.id}`, { ...item, name: item.name.trim() })
                await axiosAPI.put(`/ingredients/${id}`, recipe)
                await axiosAPI.put(`/derivatives/${id}`, derivatives)
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
        if (item.taxable) {
            const cost_price = item.purchase_price / (1 + (restaurant?.purchase_tax! / 100))
            const clean_price = cost_price / (1 - (item.waste / 100))
            setItem({ ...item, cost_price: (item.purchase_price || 0) / (1 + (restaurant?.purchase_tax! / 100)), clean_price })
            setDerivatives(derivatives.map(derivative => ({ ...derivative, cost_price: clean_price })))
        } else {
            const cost_price = item.purchase_price
            const clean_price = cost_price / (1 - (item.waste / 100))
            setItem({ ...item, cost_price: (item.purchase_price || 0), clean_price })
            setDerivatives(derivatives.map(derivative => ({ ...derivative, cost_price: clean_price })))
        }
    }, [item.purchase_price, item.taxable, item.waste])

    useEffect(() => {
        if ((item.type === "products" && item.subtype === "transformed") || item.type === "base-recipes") {
            setItem({ ...item, cost_price: recipe.reduce((acc, ingr) => acc + (getIngredientCost(ingr) / item.yield), 0) })
        }
    }, [recipe])

    return (
        <ItemContext.Provider value={{ item, setItem, saveItem, derivatives, setDerivatives, recipe, setRecipe, loading, saving }}>
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
