import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Branch, BranchSchema } from "../schemas/branch.schema"
import { Brand, BrandSchema } from "../schemas/brand.schema"
import { Currency, CurrencySchema } from "../schemas/currency.schema"

type RestaurantContextType = {
    brand?: Brand,
    branch?: Branch,
    currency?: Currency,

    setBrand: (brand: Brand) => void,
    setBranch: (branch: Branch) => void,
    setCurrency: (currency: Currency) => void,
}

export const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

export const RestaurantContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [brand, setBrand] = useState<Brand | undefined>()
    const [branch, setBranch] = useState<Branch | undefined>()
    const [currency, setCurrency] = useState<Currency | undefined>()

    useLayoutEffect(() => {
        const getLocalStorageData = () => {
            try {
                const validatedBrand = BrandSchema.parse(JSON.parse(localStorage.getItem("brand")!))
                const validatedBranch = BranchSchema.parse(JSON.parse(localStorage.getItem("branch")!))
                const validatedCurrency = CurrencySchema.parse(JSON.parse(localStorage.getItem("currency")!))

                setBrand(validatedBrand)
                setBranch(validatedBranch)
                setCurrency(validatedCurrency)
            } catch (error) {
                setBrand(undefined)
                setBranch(undefined)
                setCurrency(undefined)
            }
        }

        getLocalStorageData()
    }, [])

    useEffect(() => localStorage.setItem("brand", JSON.stringify(brand)), [brand])
    useEffect(() => localStorage.setItem("branch", JSON.stringify(branch)), [branch])
    useEffect(() => localStorage.setItem("currency", JSON.stringify(currency)), [currency])

    return <RestaurantContext.Provider value={{ brand, branch, currency, setBrand, setBranch, setCurrency }}>
        {children}
    </RestaurantContext.Provider>
}

export const useRestaurant = () => {
    const context = useContext(RestaurantContext)

    if (!context) {
        throw new Error("useRestaurant must be within RestaurantContextProvider");
    }

    return context
}