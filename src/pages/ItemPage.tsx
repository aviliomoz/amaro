import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle, Save } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { APIResponse, FullItemType, ItemTypeEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemForm } from "../components/ItemForm"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useFilter } from "../hooks/useFilter"
import { ItemsAreasTable } from "../components/tables/ItemAreasTable"
import { QuestionCircle } from "../components/QuestionCircle"
import { ItemEquivalenceTable } from "../components/tables/ItemEquivalenceTable"
import { ItemPresentationsTable } from "../components/tables/ItemPresentationsTable"
import { ItemWeightControlTable } from "../components/tables/ItemWeightControlTable"
import { ItemRecipeTable } from "../components/tables/ItemRecipeTable"
import { Fieldset } from "../components/ui/Fieldset"
import { getUm } from "../utils/um"
import { CurrencySymbol } from "../components/CurrencySymbol"

export const ItemPage = () => {

    const navigate = useNavigate()

    const [id] = useFilter("id")
    const { type, mode } = useParams<{ type: ItemTypeEnum, mode: "new" | "edit" }>()
    const { branch, brand } = useRestaurant()

    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)

    const [item, setItem] = useState<FullItemType>({
        code: '',
        name: '',
        type: type!,
        subtype: getSubtypesByType(type!)[0],
        um: 'unit',
        taxable: true,
        status: 'active',
        category_id: '',
        brand_id: brand?.id!,
        discharge_type: 'unit',
        yield: 1,
        waste: 0,
        prices: {
            sale_price: 0,
            purchase_price: 0,
            cost_price: 0
        },
        equivalence: null,
        recipe: []
    })

    useLayoutEffect(() => {

        const getItem = async () => {
            const { data: item } = await axiosAPI.get<APIResponse<FullItemType>>(`/items/${id}?branch_id=${branch?.id}`)
            setItem(item.data)
        }

        if (mode === "edit") {

            setLoading(true)

            try {
                getItem()
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [])

    const saveItem = async () => {
        setSaving(true)
        try {

            if (mode === "new") {
                await axiosAPI.post(`/items?branch_id=${branch?.id}`, { ...item, name: item.name.trim() })
                toast.success(`Ítem creado`)
            } else {
                await axiosAPI.put(`/items/${id}?branch_id=${branch?.id}`, { ...item, name: item.name.trim() })
                toast.success(`Ítem actualizado`)
            }

            navigate(-1)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <>
        <title>SISTEMA - Editor de ítem</title>
        <section>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{`${mode === "new" ? "Crear" : "Editar"} ${getItemTypeName(item.type).toLowerCase()}:`}</h3>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="size-4" />
                        Volver
                    </button>
                    <button onClick={() => saveItem()} className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                        {saving ? <LoaderCircle className='size-4 animate-spin stroke-white' /> : <Save className="size-4 stroke-white" />}
                        {saving ? "Guardando" : "Guardar"}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-10 gap-4 mt-4">
                <div className="grid grid-cols-12 col-span-4 gap-4">
                    <div className="col-span-12 flex flex-col gap-4 border rounded-md shadow-sm p-6 h-fit">
                        <h4 className="font-semibold mb-1 text-sm">Información base:</h4>
                        <ItemForm item={item} setItem={setItem} />
                    </div>
                    {item.type !== "combos" && <div className="col-span-12 flex flex-col gap-4 border rounded-md shadow-sm p-6 h-fit">
                        <h4 className="font-semibold mb-1 text-sm flex items-center gap-2">Disponibilidad por área: <QuestionCircle /></h4>
                        <ItemsAreasTable />
                    </div>}
                </div>
                <div className="flex flex-col col-span-6 gap-4">
                    <div className="col-span-12 flex flex-col gap-6 border rounded-md shadow-sm p-6 h-fit">
                        <h4 className="font-semibold text-sm mb-2">Opciones de control:</h4>
                        {((item.type === "supplies" && item.subtype === "ingredients" && item.um === "unit") || (item.type === "products" && item.subtype === "unprocessed" && item.um === "unit")) && <Fieldset>
                            <h5 className="font-semibold text-sm flex items-center gap-2">Equivalencia <QuestionCircle /></h5>
                            <ItemEquivalenceTable equivalence={item.equivalence} setEquivalence={(eq) => setItem({ ...item, equivalence: eq })} />
                        </Fieldset>}
                        {((item.type === "products" && item.subtype === "unprocessed") || (item.type === "supplies")) && <Fieldset>
                            <h5 className="font-semibold text-sm flex items-center gap-2">Presentaciones de compra <QuestionCircle /></h5>
                            <ItemPresentationsTable />
                        </Fieldset>}
                        {((item.type === "supplies" && item.subtype === "ingredients" && item.um === "unit") || (item.type === "products" && item.subtype === "unprocessed" && item.um === "unit")) && <Fieldset>
                            <h5 className="font-semibold text-sm flex items-center gap-2">Control por peso <QuestionCircle /></h5>
                            <ItemWeightControlTable />
                        </Fieldset>}
                        {((item.type === "products" && item.subtype === "transformed") || (item.type === "base-recipes")) && <Fieldset>
                            <h5 className="font-semibold text-sm flex items-center gap-2">Receta <QuestionCircle /></h5>
                            <ItemRecipeTable recipe={item.recipe} setRecipe={(re) => setItem({ ...item, recipe: re })} />
                        </Fieldset>}
                        <div className="flex justify-end items-center gap-10">
                            <Fieldset>
                                <h5 className="font-semibold text-sm flex items-center gap-2">Rendimiento <QuestionCircle /></h5>
                                <div className="flex items-center gap-2 text-sm">
                                    <input className="border rounded-md py-1.5 px-3 outline-none w-24 text-sm" type="number" min={0} step={1} id="yield" name="yield" value={item.yield} onChange={(e) => setItem({ ...item, yield: e.target.valueAsNumber })} />
                                    <span>{getUm(item.um)}{`${item.yield !== 1 ? "s" : ""}`}</span>
                                </div>
                            </Fieldset>
                            <Fieldset>
                                <h5 className="font-semibold text-sm flex items-center gap-2">Costo de la receta <QuestionCircle /></h5>
                                <div className="flex items-center gap-2 text-sm">
                                    <CurrencySymbol />
                                    <input className="border rounded-md py-1.5 px-3 outline-none w-24 text-sm" type="number" min={0} step={1} id="yield" name="yield" value={0} />
                                </div>
                            </Fieldset>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    </>
}