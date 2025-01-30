import { useFilter } from "../hooks/useFilter"

export const ItemsFormPage = () => {
    const [type] = useFilter("type")
    const [subtype] = useFilter("subtype")

    return <section>
        <p>{type}</p>
        <p>{subtype}</p>
    </section>
}