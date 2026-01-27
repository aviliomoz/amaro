import toast from "react-hot-toast"
import { useState } from "react"
import { Page } from "../components/ui/Page"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { Table } from "../components/ui/Table"
import { Download, LoaderCircle, Trash } from "lucide-react"
import { Form } from "../components/ui/Form"
import { DropdownSearch } from "../components/ui/DropdownSearch"
import { Item, ItemConversionLevelDto, IngredientConversionResult, ItemToConvertDto, APIResponse, pluralizeUm, getItemTypeTag } from "@amaro-software/core"

export const ConverterPage = () => {

    const { restaurant } = useRestaurant()
    const [products, setProducts] = useState<ItemToConvertDto[]>([])
    const [ingredients, setIngredients] = useState<IngredientConversionResult[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [conversionLevel, setConversionLevel] = useState<ItemConversionLevelDto>("superficial")

    const searchItems = async (search: string) => {
        try {
            const { data: products } = await axiosAPI.get<APIResponse<Item[]>>(`/items?search=${search}&restaurant_id=${restaurant?.id!}&types=products,base-recipes&status=active`)
            return products.data
        } catch (error) {
            toast.error("Error al buscar productos")
            return []
        }
    }

    const addProduct = (item: Item) => {
        const existingItem = products.find(product => product.id === item.id)
        if (existingItem) {
            toast.error("El producto ya está en la lista")
        } else {
            setProducts([
                ...products,
                {
                    id: item.id,
                    type: item.type,
                    subtype: item.subtype,
                    name: item.name,
                    um: item.um,
                    amount: 1
                }
            ])
        }
    }

    const removeProduct = (id: string) => {
        setProducts(products.filter(product => product.id !== id))
    }

    const generateConversion = async () => {
        if (products.length === 0) {
            toast.error("Debes agregar al menos un producto")
            return
        }

        setLoading(true)

        try {

            let cleanConsumption: IngredientConversionResult[] = []

            const { data: consumption } = await axiosAPI.post<APIResponse<IngredientConversionResult[]>>(`/items/convert?level=${conversionLevel}`, products)

            consumption.data.forEach(ingredient => {
                const existingIngredient = cleanConsumption.find(i => i.name === ingredient.name && i.um === ingredient.um)

                if (existingIngredient) {
                    existingIngredient.amount += ingredient.amount
                    existingIngredient.products.push(...ingredient.products)
                    cleanConsumption = cleanConsumption.map(i => i.name === existingIngredient.name && i.um === existingIngredient.um ? existingIngredient : i)
                } else {
                    cleanConsumption.push(ingredient)
                }
            })

            setIngredients(cleanConsumption)
            toast.success("Conversión generada exitosamente")
        } catch (error) {
            toast.error("Error al generar la conversión")
        } finally {
            setLoading(false)
        }
    }

    const downloadExcel = async () => {

        console.log("Downloading excel with level:", conversionLevel);
        const response = await axiosAPI.post(
            `/items/convert/download?level=${conversionLevel}`,
            products,
            {
                responseType: "arraybuffer",
            }
        )

        console.log("Response received for excel download:", response);

        const blob = new Blob(
            [response.data],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
        )

        console.log("Blob created for excel file:", blob);

        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = `Reporte de Consumo ${new Date().toLocaleString()}.xlsx`

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    return <Page title="Amaro - Conversor de consumo">
        <Page.Header>
            <Page.Title>Conversor de consumo</Page.Title>
            <div className="flex items-center gap-4">
                <div className="text-sm font-medium flex items-center gap-4">
                    <p>Nivel de conversión:</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="conversion-level" value="superficial" checked={conversionLevel === "superficial"} onChange={(e) => setConversionLevel(e.target.value as ItemConversionLevelDto)} />
                        Superficial
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="conversion-level" value="deep" checked={conversionLevel === "deep"} onChange={(e) => setConversionLevel(e.target.value as ItemConversionLevelDto)} />
                        Profundo
                    </label>
                </div>
                <button className="text-sm font-medium bg-orange-500 text-white px-4 py-1.5 rounded-md flex items-center gap-2 transition-all ease-in-out" onClick={generateConversion}>{loading && <LoaderCircle className={`size-4 stroke-white stroke-[3px] animate-spin`} />} Generar conversión</button>
            </div>
        </Page.Header>
        <Page.Content>
            <div className="flex gap-4">
                <div className="flex flex-col gap-4 w-4/12 text-sm">
                    <div className="flex flex-col gap-2 relative">
                        <DropdownSearch searchFunction={searchItems} onSelect={addProduct} />
                        {products.length > 0 && <Table>
                            <Table.Header>
                                <Table.Row type="header">
                                    <Table.Title>Producto</Table.Title>
                                    <Table.Title>Cantidad</Table.Title>
                                    <Table.Title>Opc.</Table.Title>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {products.map((product, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell><div className="w-64 flex min-h-10 items-center"><span className={`text-[9px] tracking-widest ${product.type === "base-recipes" ? "bg-green-300" : "bg-stone-300"} font-semibold px-1.5 rounded-md text-center mr-2`}>{getItemTypeTag(product.type)}</span>{product.name}</div></Table.Cell>
                                        <Table.Cell>
                                            <div className="w-20">
                                                <Form.NumericInput value={product.amount} onChange={(n) => setProducts(products.map(pr =>
                                                    product.id === pr.id ? { ...product, amount: n } : pr
                                                ))} />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center justify-center"><Trash className="stroke-stone-300 size-4 hover:stroke-stone-500" onClick={() => removeProduct(product.id)} /></div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>}
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-8/12 text-sm">
                    {ingredients.length === 0 ? <div className="flex justify-center items-center h-80 border border-dashed border-stone-200 shadow-sm rounded-md">
                        <p className="text-center w-80 text-stone-700">Ingresa productos a la lista para generar un reporte de consumo</p>
                    </div> : <div className="flex flex-col">
                        <div className="mb-2 flex items-center justify-between h-8">
                            <h3 className="font-semibold mb-3 text-base mt-2">Reporte de consumo:</h3>
                            <button onClick={() => downloadExcel()} className="flex items-center rounded-md bg-white px-3 gap-2 border py-1 text-sm font-medium text-stone-900 hover:bg-stone-50 transition-all ease-in-out" >
                                <Download className="size-4" />
                                <span>Descargar</span>
                            </button>
                        </div>
                        <Table>
                            <Table.Header>
                                <Table.Row type="header">
                                    <Table.Title>Ingrediente</Table.Title>
                                    <Table.Title>Cant.</Table.Title>
                                    <Table.Title>UM</Table.Title>
                                    <Table.Title>Productos</Table.Title>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {ingredients.sort((a, b) => a.name.localeCompare(b.name)).map((ingredient, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{ingredient.name}</Table.Cell>
                                        <Table.Cell>{ingredient.amount.toFixed(2)}</Table.Cell>
                                        <Table.Cell>{pluralizeUm(ingredient.um, ingredient.amount)}</Table.Cell>
                                        <Table.Cell>
                                            {ingredient.products.map((product, idx) => (
                                                <div key={idx}>{product.name} ({product.amount})</div>
                                            ))}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>}
                </div>
            </div>
        </Page.Content>
    </Page>
}