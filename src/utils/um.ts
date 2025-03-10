import { UM } from "./types"

export const UMS = {
    kilogram: "Kilo (kg)",
    liter: "Litro (lt)",
    ounce: "Onza (oz)",
    unit: "Unidad (und)"
}

export const getUm = (um: UM) => {
    return UMS[um]
}