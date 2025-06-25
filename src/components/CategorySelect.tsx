import { useEffect } from "react"
import { useItem } from "../contexts/ItemContext"
import { useCategories } from "../hooks/useCategories"
import { Form } from "./ui/Form"
import { Loading } from "./ui/Loading"

export const CategorySelect = () => {

    const { item, setItem, loading } = useItem()
    const { categories, loading: loadingCategories } = useCategories()

    useEffect(() => {
        if (categories.length > 0 && !item.category_id) {
            setItem({ ...item, category_id: categories[0].id! })
        }
    }, [categories, item.category_id, setItem])



    return <Form.Field title="Categoría" description="La categoría a la que pertenece el ítem.">
        {(loading || loadingCategories || !item.category_id) ? <Loading /> : <Form.Select value={item.category_id} onChange={(value) => setItem({ ...item, category_id: value })} options={categories.map(category => ({ label: category.name, value: category.id! }))} />}
    </Form.Field>
}