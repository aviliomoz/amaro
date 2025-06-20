import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { Page } from "../components/ui/Page"
import { APIResponse, ItemType, UMEnum } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { useRestaurant } from "../contexts/RestaurantContext"
import { Table } from "../components/ui/Table"
import { LoaderCircle, Trash } from "lucide-react"
import { pluralizeUm } from "../utils/um"
import { Form } from "../components/ui/Form"

export const ConverterPage = () => {

    const { restaurant } = useRestaurant()
    const [products, setProducts] = useState<{ item: ItemType, amount: number }[]>([])
    const [ingredients, setIngredients] = useState<{ name: string, um: UMEnum, amount: number, products: { name: string, amount: number }[] }[]>([])
    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<ItemType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const searchItems = async (search: string) => {
        if (search.length < 3) {
            setSearchResult([])
            return
        } else {
            const { data: products } = await axiosAPI.get<APIResponse<ItemType[]>>(`/items/search?search=${search}&restaurant_id=${restaurant?.id!}&type=products`)
            setSearchResult(products.data)
        }
    }

    const addProduct = (item: ItemType) => {
        const existingItem = products.find(p => p.item.id === item.id)
        if (existingItem) {
            toast.error("El producto ya está en la lista")
            setSearchResult([])
        } else {
            setProducts([...products, { item, amount: 1 }])
            setSearchResult([])
            setSearch("")
        }
    }

    const removeProduct = (id: string) => {
        setProducts(products.filter(p => p.item.id !== id))
    }

    const generateConversion = async () => {
        if (products.length === 0) {
            toast.error("Debes agregar al menos un producto")
            return
        }

        setLoading(true)

        try {

            let cleanConsumption: { name: string, um: UMEnum, amount: number, products: { name: string, amount: number }[] }[] = []

            const { data: consumption } = await axiosAPI.post<APIResponse<{ name: string, um: UMEnum, amount: number, products: { name: string, amount: number }[] }[]>>("/ingredients/convert", products)

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

    useEffect(() => {
        searchItems(search)
    }, [search])

    return <Page title="Conversor de consumo">
        <Page.Header>
            <Page.Title>Conversor de consumo</Page.Title>
            <button className="text-sm font-medium bg-orange-500 text-white px-4 py-1.5 rounded-md flex items-center gap-2 transition-all ease-in-out" onClick={generateConversion}>{loading && <LoaderCircle className={`size-4 stroke-white stroke-[3px] animate-spin`} />} Generar conversión</button>
        </Page.Header>
        <Page.Content>
            <div className="flex flex-col gap-4 w-5/12 text-sm">
                <div className="flex flex-col gap-2 relative">
                    <input className="border rounded-md px-3 py-1.5 focus:outline-double focus:outline-stone-200" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto" />
                    {searchResult.length > 0 && <div className="absolute top-10 left-0 w-full bg-white border border-stone-200 rounded-md shadow-lg z-10">
                        {searchResult.map(item => (
                            <div key={item.id} className="px-3 py-2 hover:bg-stone-100 cursor-pointer" onClick={() => addProduct(item)}>
                                {item.name}
                            </div>
                        ))}</div>
                    }
                    {products.length > 0 && <Table >
                        <Table.Header>
                            <Table.Row type="header">
                                <Table.Title>Producto</Table.Title>
                                <Table.Title>Cantidad</Table.Title>
                                <Table.Title>Opc.</Table.Title>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {products.map((p, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell><div className="w-44">{p.item.name}</div></Table.Cell>
                                    <Table.Cell>
                                        <div className="w-20">
                                            <Form.NumericInput value={p.amount} onChange={(n) => setProducts(products.map(pr =>
                                                p.item.id === pr.item.id ? { ...p, amount: n } : pr
                                            ))} />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Trash className="stroke-stone-300 size-4 hover:stroke-stone-500" onClick={() => removeProduct(p.item.id!)} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>}
                </div>
            </div>
            <div className="flex flex-col gap-4 w-7/12 text-sm">
                {ingredients.length === 0 ? <div className="flex justify-center items-center h-80 border border-dashed border-stone-200 shadow-sm rounded-md">
                    <p className="text-center w-80 text-stone-700">Ingresa productos a la lista para generar un reporte de consumo</p>
                </div> : <div className="flex flex-col">
                    <h3 className="font-semibold mb-3">Reporte de consumo:</h3>
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
                            {ingredients.map((ingredient, index) => (
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
        </Page.Content>
    </Page>
}