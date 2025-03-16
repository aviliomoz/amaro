import { useFilter } from "../hooks/useFilter"

type Props = {
    value: string | null,
    children: React.ReactNode
}

export const CategoriesListItem = ({ value, children }: Props) => {

    const [category, setCategory] = useFilter("category")

    return <button
        onClick={() => setCategory(value)}
        className={`text-sm border px-2.5 py-1 rounded-md text-left ${value === category ? "bg-stone-100 border-stone-200 font-medium" : "hover:bg-stone-100 border-transparent"}`}>
        {children}
    </button>
}