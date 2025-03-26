import { useEffect, useState } from "react"
import { APIResponse, FullIngredientType } from "../../utils/types"
import { Trash } from "lucide-react"
import { getUm } from "../../utils/um"
import { getItemTypeTag } from "../../utils/items"
import { axiosAPI } from "../../libs/axios"
import toast from "react-hot-toast"
import { useRestaurant } from "../../contexts/RestaurantContext"

type Props = {
    recipe: FullIngredientType[],
    setRecipe: (recipe: FullIngredientType[]) => void
}

export const ItemRecipeTable = ({ recipe, setRecipe }: Props) => {

    const {branch} = useRestaurant()
    const [showTable, setShowTable] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<FullIngredientType[]>([])

    useEffect(() => {
        if (recipe.length > 0) {
            setShowTable(true)
        }
    }, [recipe])

    useEffect(() => {

        const searchIngredients = setTimeout(async () => {
            if (search.length > 0) {
                const { data: searchResult } = await axiosAPI.get<APIResponse<FullIngredientType[]>>(`/items/ingredients?search=${search}&branch_id=${branch?.id}`)
                setSearchResult(searchResult.data)
            } else {
                setSearchResult([])
            }
        }, 400);

        return () => {
            clearTimeout(searchIngredients)
        }

    }, [search])

    const addIngredient = (ingredient: FullIngredientType) => {

        if (recipe.some(ingr => ingr.id === ingredient.id)) {
            return toast.error("El ítem ya existe en la receta")
        }

        setRecipe([...recipe, ingredient])
        setSearchResult([])
    }

    const removeIngredient = (ingredient: FullIngredientType) => {
        setRecipe(recipe.filter(ingr => ingr.id !== ingredient.id))
    }

    return <>
        {(!showTable) ? <button onClick={() => setShowTable(true)} className="border border-dashed rounded-md py-2 px-3 text-sm text-stone-500 hover:bg-stone-50">
            Agregar ingredientes
        </button> :
            <div>
                <div className="flex flex-col relative">
                    <input className="border rounded-md mb-4 w-full px-3 py-2 focus:outline-double focus:outline-stone-300 text-sm" type="text" placeholder="Buscar ingrediente" value={search} onChange={(e) => setSearch(e.target.value)} />
                    {searchResult.length > 0 && <ul className="absolute top-full bg-white border rounded-md shadow-sm p-2">
                        {searchResult.map(ingredient => <button onClick={() => addIngredient(ingredient)} key={ingredient.id} className="flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-stone-100 w-full">{getItemTypeTag(ingredient.type)} - {ingredient.name}</button>)}
                    </ul>}
                </div>
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
                                <td className="pl-6 text-start flex gap-2 items-center pt-3.5"><span className="text-[9px] tracking-widest bg-stone-200 font-semibold px-1.5 rounded-md text-center">{getItemTypeTag(ingredient.type)}</span><span className="truncate max-w-48 pr-4">{ingredient.name}</span></td>
                                <td className="text-start"><input type="number" className="w-20 border rounded-md px-2 py-1 focus:outline-stone-400 focus:outline-double" min={0} value={ingredient.amount} onChange={(e) => setRecipe(recipe.map(ingr => ingredient.id === ingr.id ? { ...ingr, amount: e.target.valueAsNumber } : ingr))} /></td>
                                <td className="text-start">
                                    <select disabled={ingredient.ums.length <= 1} className="border rounded-md py-1.5 px-3 outline-none cursor-pointer disabled:cursor-default w-24" id="um" name="um" value={ingredient.ums.find(um => um.used)?.um || "kilogram"} onChange={(e) => setRecipe(recipe.map(ingr => ingr.id === ingredient.id ? { ...ingr, ums: ingr.ums.map(um => um.um === e.target.value ? { ...um, used: true } : { ...um, used: false }) } : ingr))}>
                                        {ingredient.ums.map(um => <option value={um.um}>{getUm(um.um)}</option>)}
                                    </select>
                                </td>
                                <td className="text-start px-4">{((ingredient.amount || 0) * ingredient.ums.find(um => um.used)?.cost! || 0).toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</td>
                                <td className="pl-2 items-center"><Trash onClick={() => removeIngredient(ingredient)} className="size-4 cursor-pointer" /></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>}
    </>
}