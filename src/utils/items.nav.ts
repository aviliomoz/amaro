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
        value: "products",
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
        value: "combos",
        icon: Layers3,
        types: [
            {
                name: "Todos",
                value: ""
            },
            {
                name: "Promociones",
                value: "promotions"
            },
            {
                name: "Menús",
                value: "menus"
            },
            {
                name: "Buffets",
                value: "buffets"
            },
        ]
    },
    {
        name: "Insumos",
        value: "supplies",
        icon: Beef,
        types: [
            {
                name: "Todos",
                value: ""
            },
            {
                name: "Ingredientes",
                value: "ingredients"
            },
            {
                name: "Artículos",
                value: "consumables"
            },
        ]
    },
    {
        name: "Recetas base",
        value: "base-recipes",
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