import { ChevronDown, ChevronUp } from "lucide-react"
import { useItem } from "../contexts/ItemContext"
import { useRestaurant } from "../contexts/RestaurantContext"
import { Form } from "./ui/Form"
import { useState } from "react"

export const SuggestedPriceCalc = () => {
    const { item, setItem } = useItem()
    const { restaurant } = useRestaurant()
    const [show, setShow] = useState<boolean>(false)

    const totalCost = (0.80 * item.cost_price) / 0.35
    const profit = (item.profitability / 100) * item.cost_price / 0.35
    const priceBeforeTax = totalCost + profit
    const taxes = priceBeforeTax * (restaurant?.sales_tax! / 100) || 0
    const priceAfterTax = priceBeforeTax + taxes
    const commissions = priceAfterTax * 0.028 // Assuming a 2.8% commission
    const priceAfterCommissions = priceAfterTax + commissions
    const finalPrice = Math.round(priceAfterCommissions)

    return <div className="flex flex-col gap-2 text-sm">
        <h3 onClick={() => setShow(!show)} className="font-bold mb-2 flex items-center gap-2 justify-end cursor-pointer">Cálculo de precio sugerido {show ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}</h3>
        {show && <><div className="flex items-center justify-end gap-2">
            <p className="flex items-center gap-2 font-semibold">Costo total (80%):</p>
            <p className="w-28 text-right font-bold">{totalCost.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
        </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Rentabilidad deseada:</p>
                <div className="w-24 ml-4">
                    <Form.NumericInput
                        value={item.profitability}
                        onChange={(value) => setItem({ ...item, profitability: value })}
                        symbol="%"
                        symbolPosition="right"
                        max={100}
                    />
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Utilidad:</p>
                <p className="w-28 text-right font-bold">{profit.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
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
            <div className="flex items-center justify-end gap-2 mt-2">
                <p className="flex items-center gap-2 font-semibold">{`Comisiones (${(0.028).toLocaleString("es-PE", { style: "percent", maximumFractionDigits: 2 })}):`}</p>
                <p className="w-28 text-right font-medium">{commissions.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Precio despues de comisiones:</p>
                <p className="w-28 text-right font-bold">{priceAfterCommissions.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
                <p className="flex items-center gap-2 font-semibold">Precio sugerido:</p>
                <p className="w-28 text-right font-bold text-lg">{finalPrice.toLocaleString("es-PE", { style: "currency", currency: "PEN" })}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p className="flex items-center gap-2 font-semibold">Food cost con precio sugerido:</p>
                <p className="w-28 text-right font-bold">{(item.cost_price / priceBeforeTax).toLocaleString("es-PE", { style: "percent", maximumFractionDigits: 2 })}</p>
            </div>
        </>}
    </div>
}