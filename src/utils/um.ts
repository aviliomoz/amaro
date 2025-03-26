import { UMEnum } from "./types"

export const UMS: Record<UMEnum, string> = {
    kilogram: "Kilo",
    liter: "Litro",
    ounce: "Onza",
    unit: "Unidad"
}

export const getUm = (um: UMEnum) => {
    return UMS[um]
}