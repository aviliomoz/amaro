import { IngredientType } from "./types";

export const getIngredientCost = (ingredient: IngredientType) => {

    if (ingredient.base_um === ingredient.um) {
        return ingredient.base_cost * ingredient.amount
    }

    if (ingredient.base_um !== "unit") {

        if (ingredient.base_um === "kilogram") {
            if (ingredient.um === "ounce") return ingredient.base_cost * ingredient.amount / 35.274
            if (ingredient.um === "liter") return ingredient.base_cost * ingredient.amount / 33.814
        }

        if (ingredient.base_um === "liter") {
            if (ingredient.um === "ounce") return ingredient.base_cost * ingredient.amount / 33.814
            if (ingredient.um === "kilogram") return ingredient.base_cost * ingredient.amount / 35.274
        }

        if (ingredient.base_um === "ounce") {
            if (ingredient.um === "kilogram") return ingredient.base_cost * ingredient.amount * 35.274
            if (ingredient.um === "liter") return ingredient.base_cost * ingredient.amount * 33.814
        }
    } else {
        if (ingredient.equivalence_um !== null && ingredient.equivalence_amount !== null) {
            const equivalenceCost = ingredient.base_cost / ingredient.equivalence_amount;

            if (ingredient.equivalence_um === ingredient.um) return equivalenceCost * ingredient.amount

            if (ingredient.equivalence_um === "kilogram") {
                if (ingredient.um === "ounce") return equivalenceCost * ingredient.amount / 35.274
            }

            if (ingredient.equivalence_um === "liter") {
                if (ingredient.um === "ounce") return equivalenceCost * ingredient.amount / 33.814
            }

            if (ingredient.equivalence_um === "ounce") {
                if (ingredient.um === "kilogram") return equivalenceCost * ingredient.amount * 35.274
                if (ingredient.um === "liter") return equivalenceCost * ingredient.amount * 33.814
            }
        }
    }

    return 0;
}