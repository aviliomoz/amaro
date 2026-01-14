// import toast from "react-hot-toast"
// import { FormEvent, useState } from "react"
// import { useFilter } from "../hooks/useFilter"
// import { Category, ItemType, CreateCategoryDto, UpdateCategoryDto } from "@amaro-software/core"
// import { useRestaurant } from "../contexts/RestaurantContext"
// import { Form } from "./ui/Form"
// import { axiosAPI } from "../libs/axios"

import { Category } from "@amaro-software/core";

type Props = {
    category?: Category
}

export const CategoriesForm = ({ category }: Props) => {

    return category; // TODO: Fix reload issue after creating/editing category

    // const { restaurant } = useRestaurant()
    // const [type] = useFilter<ItemType>("type")
    // const [formData, setFormData] = useState<Category | CreateCategoryDto | UpdateCategoryDto>(category || {
    //     name: "",
    //     type: type,
    //     status: "active",
    //     restaurant_id: restaurant?.id!,
    // })

    // const handleSave = async (e: FormEvent) => {
    //     e.preventDefault()

    //     if (!formData.name!.trim()) {
    //         toast.error("El nombre de la categoría es obligatorio")
    //         return
    //     }

    //     try {
    //         if (category) {
    //             await axiosAPI.put(`/categories/${category.id}`, formData)
    //             toast.success("Categoría actualizada correctamente")
    //         } else {
    //             await axiosAPI.post("/categories", formData)
    //             toast.success("Categoría creada correctamente")
    //         }
    //         location.reload() // Recargar la página para reflejar los cambios
    //     } catch (error) {
    //         toast.error("Error al guardar la categoría")
    //     }
    // }

    // return <Form>
    //     {/* <h3 className="text-sm font-semibold">{formData.id ? "Editar" : "Nueva"} categoría</h3> */}
    //     <Form.Field title="Tipo" >
    //         <Form.Select value={formData.type} onChange={(type) => setFormData({ ...formData, type: type as ItemType })} options={[
    //             { value: "products", label: "Productos" },
    //             { value: "combos", label: "Combos" },
    //             { value: "supplies", label: "Insumos" },
    //             { value: "base-recipes", label: "Recetas base" },
    //         ]} />
    //     </Form.Field>
    //     <Form.Field title="Nombre" >
    //         <Form.TextInput
    //             value={formData.name}
    //             onChange={(name) => setFormData({ ...formData, name })}
    //         // placeholder="Nombre de la categoría"
    //         />
    //     </Form.Field>
    //     <div className="mt-2 text-sm font-medium flex items-center justify-end gap-3">
    //         <button onClick={handleSave} className="bg-gradient-to-br text-white px-3 py-1 rounded-md from-orange-500 to-orange-600">Guardar</button>
    //     </div>
    // </Form>
}