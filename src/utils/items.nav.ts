import { Beef, CookingPot, Layers3, LucideIcon, Salad } from "lucide-react"

type ItemNav = {
    name: string,
    value: string,
    icon: LucideIcon,
    types: {
        name: string,
        value: string
    }[]
}

export const ITEMS_NAV: ItemNav[] = [
    {
        name: "Productos",
        value: "product",
        icon: Salad,
        types: [
            {
                name: "Todos",
                value: ""
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
        value: "combo",
        icon: Layers3,
        types: [
            {
                name: "Todos",
                value: ""
            },
            {
                name: "Promociones",
                value: "promotion"
            },
            {
                name: "Menús",
                value: "menu"
            },
            {
                name: "Buffets",
                value: "buffet"
            },
        ]
    },
    {
        name: "Insumos",
        value: "supply",
        icon: Beef,
        types: [
            {
                name: "Todos",
                value: ""
            },
            {
                name: "Ingredientes",
                value: "ingredient"
            },
            {
                name: "Descartables",
                value: "disposable"
            },
            {
                name: "Artículos",
                value: "other"
            },
        ]
    },
    {
        name: "Recetas base",
        value: "base-recipe",
        icon: CookingPot,
        types: [
            {
                name: "Todas",
                value: ""
            },
            {
                name: "Pre elaboradas",
                value: "pre-made"
            },
            {
                name: "A la minuta",
                value: "minute"
            },
        ]
    },
]