import { UM } from "./types"

export const UMS = {
    kilogram: "Kilo (kg)",
    litre: "Litro (lt)",
    ounze: "Onza (oz)",
    unit: "Unidad (und)"
}

export const getUm = (um: UM) => {
    return UMS[um]
}