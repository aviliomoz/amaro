export const CurrencySymbol = () => {
    return <span>
        {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" })
            .formatToParts(0)
            .find(part => part.type === "currency")!.value}
    </span>
}