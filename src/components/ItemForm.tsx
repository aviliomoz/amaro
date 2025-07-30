import { getItemSubtypeName, getSubtypesByType } from "../utils/items"
import { UMEnum, ItemStatusEnum, ItemSubtypeEnum } from "../utils/types"
import { useItem } from "../contexts/ItemContext"
import { Form } from "./ui/Form"
import { Box } from "./ui/Box"
import { ItemEquivalenceOption } from "./ItemEquivalenceOption"
import { ItemPresentationsTable } from "./tables/ItemPresentationsTable"
import { ItemAreasTable } from "./tables/ItemAreasTable"
import { ItemRecipeTable } from "./tables/ItemRecipeTable"
import { useRestaurant } from "../contexts/RestaurantContext"
import { ItemDerivativesTable } from "./ItemDerivativesTable"
import { Loading } from "./ui/Loading"
import { CategorySelect } from "./CategorySelect"
import { SuggestedPriceCalc } from "./SuggestedPriceCalc"

export const ItemForm = () => {

    const { item, setItem, loading } = useItem()
    const { restaurant } = useRestaurant()

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
                            <Form.Select value={item.subtype} onChange={(value) => setItem({ ...item, subtype: value as ItemSubtypeEnum })} options={getSubtypesByType(item.type).map(subtype => ({ label: getItemSubtypeName(subtype), value: subtype }))} />
                        </Form.Field>
                        <Form.Field title="Unidad de medida" description="La unidad de medida del ítem.">
                            <Form.Select value={item.um} onChange={(value) => setItem({ ...item, um: value as UMEnum })} options={[
                                { label: "Unidad", value: "unit" },
                                { label: "Kilogramo", value: "kilogram" },
                                { label: "Litro", value: "liter" },
                                { label: "Onza", value: "ounce" }
                            ]} />
                        </Form.Field>
                    </div>

                    <div className="flex gap-4">
                        <CategorySelect />
                        <Form.Field title="Estado" description="El estado del ítem.">
                            <Form.Select value={item.status} onChange={(value) => setItem({ ...item, status: value as ItemStatusEnum })} options={[
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
                                <Form.NumericInput disabled value={item.sale_price / (1 + 0.028) / (1 + (restaurant?.sales_tax! / 100))} onChange={(value) => setItem({ ...item, sale_price: value as number })} symbol={"S/"} />
                            </Form.Field>
                        </div>
                    }

                    {((item.type === "products" && item.subtype === "unprocessed") || item.type === "supplies") &&
                        <>
                            <div className="flex gap-4">
                                <Form.Field title="Precio de compra" description="">
                                    <Form.NumericInput value={item.purchase_price} onChange={(value) => setItem({ ...item, purchase_price: value as number })} symbol={"S/"} />
                                </Form.Field>
                                <Form.Field title="Costo" description="">
                                    <Form.NumericInput disabled value={item.cost_price} onChange={(value) => setItem({ ...item, cost_price: value as number })} symbol={"S/"} />
                                </Form.Field>
                            </div>
                            <Form.Checkbox label="Afecto a impuestos" value={item.taxable} onChange={(value) => setItem({ ...item, taxable: value })} />
                        </>
                    }


                    {item.type === "supplies" &&
                        <>
                            <Form.Separator />
                            <div className="flex gap-4">
                                <Form.Field title="Merma" description="La merma del ítem.">
                                    <Form.NumericInput max={99.99} value={item.waste} onChange={(value) => setItem({ ...item, waste: value as number })} symbol={"%"} />
                                </Form.Field>
                                <Form.Field title="Costo sin merma" description="El costo del ítem sin merma.">
                                    <Form.NumericInput disabled value={item.clean_price} onChange={(value) => setItem({ ...item, clean_price: value as number })} symbol={"S/"} />
                                </Form.Field>
                            </div>
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
                    {((item.type === "products" && item.subtype === "unprocessed") || item.type === "supplies") &&
                        <Form.Field title="Presentaciones de compra" description="">
                            <ItemPresentationsTable />
                        </Form.Field>}
                    {item.type === "supplies" &&
                        <Form.Field title="Derivados" description="">
                            <ItemDerivativesTable />
                        </Form.Field>}
                    {item.type !== "combos" && <Form.Field title="Áreas" description="">
                        <ItemAreasTable />
                    </Form.Field>}
                    {((item.type === "products" && item.subtype === "transformed") || item.type === "base-recipes") &&
                        <>
                            <Form.Separator />
                            <Form.Field title="Receta" description="">
                                <ItemRecipeTable />
                            </Form.Field>
                            {item.cost_price > 0 && item.type === "products" && <SuggestedPriceCalc />}
                        </>}
                </Form>
            </Box>
        </section>
    </div>
}