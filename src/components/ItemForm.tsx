import { useItem } from "../contexts/ItemContext"
import { Form } from "./ui/Form"
import { Box } from "./ui/Box"
import { ItemEquivalenceOption } from "./ItemEquivalenceOption"
import { ItemRecipeTable } from "./tables/ItemRecipeTable"
import { useRestaurant } from "../contexts/RestaurantContext"
import { Loading } from "./ui/Loading"
import { SuggestedPriceCalc } from "./SuggestedPriceCalc"
import { useCategories } from "../hooks/useCategories"
import { useEffect } from "react"
import { ItemSubtype, ItemStatus, ItemUm, getItemSubtypeName, getSubtypesByType } from "@amaro-software/core"

export const ItemForm = () => {

    const { item, setItem, loading } = useItem()
    const { restaurant } = useRestaurant()
    const { categories, loading: loadingCategories } = useCategories()

    useEffect(() => {
        if (categories.length > 0 && !item.category_id) {
            setItem({ ...item, category_id: categories[0].id! })
        }
    }, [categories, item.category_id, setItem])

    if (loading) return <Loading />

    return <div className="flex gap-4 w-full">
        <section className="w-2/5">
            <Box title="Información básica:">
                <Form>
                    <Form.Field title="Nombre">
                        <Form.TextInput value={item.name} onChange={(value) => setItem({ ...item, name: value })} />
                    </Form.Field>

                    <div className="flex gap-4">
                        <Form.Field title="Tipo" description="El tipo de ítem que estás creando.">
                            <Form.Select value={item.subtype} onChange={(value) => setItem({ ...item, subtype: value as ItemSubtype })} options={getSubtypesByType(item.type).map(subtype => ({ label: getItemSubtypeName(subtype) as string, value: subtype }))} />
                        </Form.Field>
                        <Form.Field title="Unidad de medida" description="La unidad de medida del ítem.">
                            <Form.Select value={item.um} onChange={(value) => setItem({ ...item, um: value as ItemUm })} options={[
                                { label: "Unidad", value: "unit" },
                                { label: "Kilogramo", value: "kilogram" },
                                { label: "Litro", value: "liter" },
                                { label: "Onza", value: "ounce" }
                            ]} />
                        </Form.Field>
                    </div>

                    <div className="flex gap-4">
                        <Form.Field title="Categoría" description="">
                            {(loading || loadingCategories || !item.category_id) ? <Loading /> : <Form.Select value={item.category_id} onChange={(value) => setItem({ ...item, category_id: value })} options={categories.map(category => ({ label: category.name, value: category.id! }))} />}
                        </Form.Field>
                        <Form.Field title="Estado" description="">
                            <Form.Select value={item.status} onChange={(value) => setItem({ ...item, status: value as ItemStatus })} options={[
                                { label: "Activo", value: "active" },
                                { label: "Inactivo", value: "inactive" }
                            ]} />
                        </Form.Field>
                    </div>

                    {item.type !== "base-recipes" && <Form.Separator />}

                    {((item.type === "products") || (item.type === "combos")) &&
                        <div className="flex gap-4">
                            <Form.Field title="Precio de venta" description="">
                                <Form.NumericInput value={item.sale_price} onChange={(value) => setItem({ ...item, sale_price: value as number })} symbol={"S/"} />
                            </Form.Field>
                            <Form.Field title="Valor venta" description="Valor del producto sin impuestos ni comisiones.">
                                <Form.NumericInput disabled value={item.sale_price / (1 + (restaurant?.commissions! / 100)) / (1 + (restaurant?.sales_tax! / 100))} onChange={(value) => setItem({ ...item, sale_price: value as number })} symbol={"S/"} />
                            </Form.Field>
                        </div>
                    }

                    {((item.type === "products" && item.subtype === "unprocessed") || item.type === "supplies") &&
                        <>
                            <div className="flex gap-4">
                                <Form.Field title="Precio de compra" description="">
                                    <Form.NumericInput value={item.purchase_price} onChange={(value) => setItem({ ...item, purchase_price: value as number })} symbol={"S/"} />
                                </Form.Field>
                                <Form.Field title="Costo" description="Costo del ítem sin impuestos ni comisiones.">
                                    <div className="flex items-center gap-2">
                                        <Form.NumericInput disabled value={item.cost_price} onChange={(value) => setItem({ ...item, cost_price: value as number })} symbol={"S/"} />
                                        {item.subtype === "unprocessed" && item.sale_price > 0 && <span className="text-sm font-medium">{(item.cost_price / (item.sale_price / (1 + (restaurant?.commissions! / 100)) / (1 + (restaurant?.sales_tax! / 100)))).toLocaleString("es-PE", { style: "percent", maximumFractionDigits: 1 })}</span>}
                                    </div>
                                </Form.Field>
                            </div>
                            <Form.Checkbox label="Afecto a impuestos" value={item.taxable} onChange={(value) => setItem({ ...item, taxable: value })} />
                        </>
                    }

                    <Form.Separator />

                    <div className="flex gap-4">
                        <Form.Field title="Código interno" description="El código interno del ítem.">
                            <Form.TextInput placeholder="Opcional" value={item.internal_code || ""} onChange={(value) => setItem({ ...item, internal_code: value })} />
                        </Form.Field>
                        <Form.Field title="Código externo" description="El código externo del ítem.">
                            <Form.TextInput placeholder="Opcional" value={item.external_code || ""} onChange={(value) => setItem({ ...item, external_code: value })} />
                        </Form.Field>
                    </div>
                </Form>
            </Box>
        </section>
        <section className="w-3/5">
            <Box title="Opciones de control:">
                <Form>
                    {((item.type === "products" && item.subtype === "unprocessed") || item.type === "supplies") && item.um === "unit" &&
                        <Form.Field title="Equivalencia" description="La equivalencia del ítem.">
                            <ItemEquivalenceOption />
                        </Form.Field>}
                    {((item.type === "products" && item.subtype === "transformed") || item.type === "base-recipes") &&
                        <Form.Field title="Receta" description="">
                            <ItemRecipeTable />
                        </Form.Field>}
                    {item.cost_price > 0 && item.type === "products" && <SuggestedPriceCalc />}
                </Form>
            </Box>
        </section>
    </div>
}