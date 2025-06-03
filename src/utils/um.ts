import { IngredientType, UMEnum } from "./types"

export const UMS: Record<UMEnum, string> = {
    kilogram: "Kilo",
    liter: "Litro",
    ounce: "Onza",
    unit: "Unidad"
}

export const getUm = (um: UMEnum) => {
    return UMS[um]
}

export const pluralizeUm = (um: UMEnum, amount: number) => {
    if (um === "kilogram") return amount !== 1 ? "Kilos" : "Kilo"
    if (um === "liter") return amount !== 1 ? "Litros" : "Litro"
    if (um === "ounce") return amount !== 1 ? "Onzas" : "Onza"
    return amount !== 1 ? "Unidades" : "Unidad"
}

export const getIngredientUms = (ingredient: IngredientType): UMEnum[] => {

    const ums: UMEnum[] = []

    ums.push(ingredient.base_um)

    if (ingredient.base_um === "unit") {
        if (ingredient.equivalence_um) {
            ums.push(ingredient.equivalence_um)
            if (ingredient.equivalence_um !== "ounce") {
                ums.push("ounce")
            }
        }
    } else if (ingredient.base_um === "ounce") {
        ums.push("kilogram")
        ums.push("liter")
        ums.push("ounce")
    } else {
        ums.push("ounce")
    }

    return ums

}