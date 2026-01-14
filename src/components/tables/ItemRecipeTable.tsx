import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { axiosAPI } from "../../libs/axios"
import { useRestaurant } from "../../contexts/RestaurantContext"
import { useItem } from "../../contexts/ItemContext"
import { IngredientRow } from "../IngredientRow"
import { Form } from "../ui/Form"
import { Item, pluralizeUm, getIngredientCost, getItemTypeTag, APIResponse } from "@amaro-software/core"

export const ItemRecipeTable = () => {

    const { restaurant } = useRestaurant()
    const { recipe, setRecipe, item, loading, setItem } = useItem()
    const [showTable, setShowTable] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<Item[]>([])
    const [searching, setSearching] = useState<boolean>(false)

    useEffect(() => {
        if (recipe.length > 0) {
            setShowTable(true)
        }
    }, [recipe])

    useEffect(() => {

        const searchIngredients = setTimeout(async () => {
            if (search.length > 0) {
                setSearching(true)

                try {
                    const { data: searchResult } = await axiosAPI.get<APIResponse<Item[]>>(`/items?search=${search}&restaurant_id=${restaurant?.id}&status=active`)
                    setSearchResult(searchResult.data)
                } catch (error) {
                    toast.error("Error al buscar")
                    console.log(error)
                }
                finally {
                    setSearching(false)
                }
            } else {
                setSearchResult([])
            }
        }, 200);

        return () => {
            clearTimeout(searchIngredients)
        }

    }, [search])

    const addIngredient = async (ingredient: Item) => {

        setRecipe([...recipe, {
            id: ingredient.id,
            name: ingredient.name,
            um: ingredient.um,
            amount: 1,
            type: ingredient.type,
            item_um: ingredient.um,
            item_cost: ingredient.cost_price,
            item_equivalence_um: ingredient.equivalence_um,
            item_equivalence_amount: ingredient.equivalence_amount,
        }])
        setSearchResult([])
        setSearch("")
    }

    useEffect(() => {
        if ((item.type === "products" && item.subtype === "transformed") || (item.type === "base-recipes")) {
            setItem({ ...item, cost_price: recipe.reduce((acc, ingredient) => acc + (getIngredientCost(ingredient)), 0) / item.yield })
        }
    }, [item.yield, recipe])

    if (loading) return <LoaderCircle className="absolute top-3 right-3 size-4 stroke-blue-400 animate-spin" />

    return <>
        {(!showTable) ? <button onClick={() => setShowTable(true)} className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
            Agregar ingredientes
        </button> :
            <div>
                <div className="flex flex-col relative">
                    <input className="border rounded-md mb-4 w-full px-3 py-2 focus:outline-double focus:outline-stone-300 text-sm" type="text" placeholder="Buscar ingrediente" value={search} onChange={(e) => setSearch(e.target.value)} />
                    {searchResult.length > 0 && <ul className="absolute top-full -mt-2 bg-white border rounded-md shadow-md p-2">
                        {searchResult.filter(item => item.type !== "combos" && item.subtype !== "transformed").map(ingredient => <button onClick={() => addIngredient(ingredient)} key={ingredient.id} className="flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-stone-100 w-full">{getItemTypeTag(ingredient.type)} - {ingredient.name}</button>)}
                    </ul>}
                    {(searching) && <LoaderCircle className="absolute top-3 right-3 size-4 stroke-stone-400 animate-spin" />}
                </div>
                {
                    recipe.length > 0 &&
                    <>
                        <div className="border rounded-md w-full h-fit overflow-hidden">
                            <table className="text-sm w-full text-center">
                                <thead className="text-center">
                                    <tr className="bg-stone-100 h-10 border-b">
                                        <th className="w-5/12 pl-6 text-start">Ingrediente</th>
                                        <th className="text-start">Cantidad</th>
                                        <th className="text-center">U. M.</th>
                                        <th className="text-center">Costo</th>
                                        <th className="pr-4 text-center">Opc.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipe.map(ingredient => <tr className="h-12 border-b last:border-none">
                                        <IngredientRow ingredient={ingredient} />
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-start justify-between mt-6 gap-10">
                            <div className="w-3/12">
                                <Form.Field title="Rendimiento" description="El rendimiento total de la receta.">
                                    <Form.NumericInput value={item.yield} onChange={(value) => setItem({ ...item, yield: value })} symbol={pluralizeUm(item.um, item.yield)} symbolPosition="right" />
                                </Form.Field>
                            </div>
                            <div className="flex gap-4 justify-end w-9/12">
                                <div className="w-5/12">
                                    <Form.Field title="Costo de la receta" description="El costo total de la receta.">
                                        {/* <Form.NumericInput value={item.cost_price * item.yield} symbol={"S/"} disabled /> */}
                                        <span className="font-semibold mt-1">{(item.cost_price * item.yield).toLocaleString("es-PE", { maximumFractionDigits: 2, minimumFractionDigits: 2, style: "currency", currency: "PEN" })}</span>

                                    </Form.Field>
                                </div>
                                {item.yield !== 1 && <div className="w-5/12">
                                    <Form.Field title="Costo de la U.M." description="El costo total de la receta.">
                                        {/* <Form.NumericInput value={item.cost_price} symbol={"S/"} disabled /> */}
                                        <span className="font-semibold mt-1">{item.cost_price.toLocaleString("es-PE", { maximumFractionDigits: 2, minimumFractionDigits: 2, style: "currency", currency: "PEN" })}</span>
                                    </Form.Field>
                                </div>}
                                {item.type === "products" && item.sale_price > 0 && <div className="w-3/12">
                                    <Form.Field title="% Costo" description="Porcentaje costo">
                                        {/* <Form.NumericInput value={(item.cost_price / (item.sale_price / 1.10))} disabled /> */}
                                        <span className="font-semibold mt-1">{(item.cost_price / (item.sale_price / (1 + (restaurant?.commissions! / 100)) / (1 + (restaurant?.sales_tax! / 100)))).toLocaleString("es-PE", { maximumFractionDigits: 2, minimumFractionDigits: 2, style: "percent" })}</span>
                                    </Form.Field>
                                </div>}
                            </div>
                        </div>
                    </>
                }
            </div>}
    </>
}