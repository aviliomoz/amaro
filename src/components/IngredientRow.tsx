import { IngredientType, UMEnum } from "../utils/types";
import { getItemTypeTag } from "../utils/items";
import { Trash } from "lucide-react";
import { useItem } from "../contexts/ItemContext";
import { getIngredientCost } from "../utils/cost";
import { getIngredientUms, pluralizeUm } from "../utils/um";

type Props = {
    ingredient: IngredientType;
}

export const IngredientRow = ({ ingredient }: Props) => {

    const { recipe, setRecipe } = useItem()

    const removeIngredient = (ingredient: IngredientType) => {
        setRecipe(recipe.filter(ingr => ingr.id !== ingredient.id))
    }

    return <>
        <td className="pl-6 text-start flex gap-2 items-center pt-3.5"><span className="text-[9px] tracking-widest bg-stone-200 font-semibold px-1.5 rounded-md text-center">{getItemTypeTag(ingredient.type)}</span><span title={ingredient.name} className="truncate max-w-48 pr-4">{ingredient.name}</span></td>
        <td className="text-start"><input type="number" className="w-20 border rounded-md px-2 py-1 focus:outline-stone-400 focus:outline-double" min={0} value={ingredient.amount} onChange={(e) => setRecipe(recipe.map(ingr => ingredient.id === ingr.id ? { ...ingr, amount: e.target.valueAsNumber } : ingr))} /></td>
        <td>
            <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer disabled:cursor-default w-28" id="um" name="um" value={ingredient.um} onChange={(e) => setRecipe(recipe.map(ingr => ingredient.id === ingr.id ? { ...ingr, um: e.target.value as UMEnum } : ingr))}>
                {getIngredientUms(ingredient).map(um => <option key={um} value={um}>{pluralizeUm(um, ingredient.amount)}</option>)}
            </select>
        </td>
        <td className="text-start px-4">{(getIngredientCost(ingredient)).toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</td>
        <td className="pl-2 items-center"><Trash onClick={() => removeIngredient(ingredient)} className="size-4 cursor-pointer" /></td>
    </>
}