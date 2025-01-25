import { Beef, CookingPot, Layers3, LucideIcon, Salad } from "lucide-react"

type ItemNav = {
    name: string,
    url: string,
    icon: LucideIcon,
    types: {
        name: string,
        value: string
    }[]
}

export const ITEMS_NAV: ItemNav[] = [
    {
        name: "Productos",
        url: "/items/products",
        icon: Salad,
        types: [
            {
                name: "Todos",
                value: "all"
            },
            {
                name: "Transformados",
                value: "transformed"
            },
            {
                name: "No transformados",
                value: "unprocessed"
            },
        ]
    },
    {
        name: "Combos",
        url: "/items/combos",
        icon: Layers3,
        types: [
            {
                name: "Todos",
                value: "all"
            },
            {
                name: "Promociones",
                value: "promotions"
            },
            {
                name: "Menús",
                value: "menus"
            },
        ]
    },
    {
        name: "Insumos",
        url: "/items/supplies",
        icon: Beef,
        types: [
            {
                name: "Todos",
                value: "all"
            },
            {
                name: "Ingredientes",
                value: "ingredients"
            },
            {
                name: "Descartables",
                value: "disposables"
            },
            {
                name: "Artículos",
                value: "others"
            },
        ]
    },
    {
        name: "Subproductos",
        url: "/items/subproducts",
        icon: CookingPot,
        types: [
            {
                name: "Todos",
                value: "all"
            },
            {
                name: "Derivados",
                value: "derivatives"
            },
            {
                name: "Recetas base",
                value: "base-recipes"
            },
            {
                name: "Porciones",
                value: "portions"
            }
        ]
    },
]