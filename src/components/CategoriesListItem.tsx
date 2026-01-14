import { useFilter } from "../hooks/useFilter"
import { Category } from "@amaro-software/core"

type Props = {
    category: Category | null,
    children: React.ReactNode
}

export const CategoriesListItem = ({ category, children }: Props) => {

    const [categoryId, setCategoryId] = useFilter("category_id")

    return <button
        onClick={() => setCategoryId(category ? category.id! : null)}
        className={`
            text-sm border px-2.5 py-1 rounded-md text-left 
            ${(!category && !categoryId) || (category && category.id === categoryId)
                ? "bg-stone-100 border-stone-200 font-medium" 
                : "hover:bg-stone-100 border-transparent"}`}
        >
        {children}
    </button>
}