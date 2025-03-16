import { useFilter } from "../../hooks/useFilter"

type Props = {
    value: string | null,
    children: React.ReactNode
}

export const SubtypeFilter = ({ value, children }: Props) => {

    const [subtype, setSubtype] = useFilter("subtype")

    return <button
        key={value}
        onClick={() => setSubtype(value)}
        className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${subtype === value ? "bg-stone-900 text-white" : "hover:bg-stone-200"}`}>
        {children}
    </button>
}