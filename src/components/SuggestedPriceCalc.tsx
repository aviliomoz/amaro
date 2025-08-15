import { ChevronDown, ChevronUp } from "lucide-react"
import { useItem } from "../contexts/ItemContext"
import { useRestaurant } from "../contexts/RestaurantContext"
import { Form } from "./ui/Form"
import { useState } from "react"

export const SuggestedPriceCalc = () => {
    const { item, setItem } = useItem()
    const { restaurant } = useRestaurant()
    const [show, setShow] = useState<boolean>(false)

    const grossProfitPercentage = 100 - item.cost_percentage
    const grossProfit = ((grossProfitPercentage / 100) * (item.cost_price || 0)) / ((item.cost_percentage || 0) / 100)
    const priceBeforeTax = (item.cost_price || 0) + grossProfit
    const taxes = priceBeforeTax * (restaurant?.sales_tax! / 100) || 0
    const priceAfterTax = priceBeforeTax + taxes
    const commissionsPercentage = (restaurant?.commissions! / 100) || 0 // Default to 0% if not set 
    const commissions = priceAfterTax * commissionsPercentage
    const priceAfterCommissions = priceAfterTax + commissions
    const finalPrice = Math.round(priceAfterCommissions)

    return <div className="flex flex-col gap-2 text-sm">
        <h3 onClick={() => setShow(!show)} className="font-bold mb-2 flex items-center gap-2 justify-end cursor-pointer">Cálculo de precio sugerido {show ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}</h3>
        {show && <>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">{`Porcentaje de costo deseado:`}</p>
                <div className="w-24 ml-4">
                    <Form.NumericInput
                        value={item.cost_percentage}
                        onChange={(value) => setItem({ ...item, cost_percentage: value })}
                        symbol="%"
                        symbolPosition="right"
                        max={100}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">{`Margen de contribución (${(grossProfitPercentage / 100).toLocaleString("es-PE", { style: "percent" })}):`}</p>
                <p className="w-28 text-right font-bold">{grossProfit.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Precio antes de impuestos:</p>
                <p className="w-28 text-right font-bold">{priceBeforeTax.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
                <p className="flex items-center gap-2 font-semibold">{`Impuestos (${(restaurant?.sales_tax! / 100).toLocaleString("es-PE", { style: "percent" })}):`}</p>
                <p className="w-28 text-right font-medium">{taxes.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Precio despues de impuestos:</p>
                <p className="w-28 text-right font-bold">{priceAfterTax.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            {commissions > 0 && <><div className="flex items-center justify-end gap-2 mt-2">
                <p className="flex items-center gap-2 font-semibold">{`Comisiones (${(commissionsPercentage).toLocaleString("es-PE", { style: "percent", maximumFractionDigits: 2 })}):`}</p>
                <p className="w-28 text-right font-medium">{commissions.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
                <div className="flex items-center justify-end gap-2">
                    <p className="flex items-center gap-2 font-semibold">Precio despues de comisiones:</p>
                    <p className="w-28 text-right font-bold">{priceAfterCommissions.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
                </div></>}
            <div className="flex items-center justify-end gap-2 mt-2">
                <p className="flex items-center gap-2 font-semibold">Precio sugerido redondeado:</p>
                <p className="w-28 text-right font-bold text-lg">{finalPrice.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
        </>}
    </div>
}