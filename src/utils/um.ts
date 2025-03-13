import { UM } from "./types"

export const UMS = {
    kilogram: "Kilogramo",
    liter: "Litro",
    ounce: "Onza",
    unit: "Unidad"
}

export const getUm = (um: UM) => {
    return UMS[um]
}