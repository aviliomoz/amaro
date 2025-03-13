import { createContext, useContext, useState } from "react";
import { Branch, Brand } from "../utils/types";

type RestaurantContextType = {
    brand?: Brand;
    branch?: Branch;
    setBrand: (brand: Brand) => void;
    setBranch: (branch: Branch) => void;
};

export const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [brand, setBrand] = useState<Brand>();
    const [branch, setBranch] = useState<Branch>();

    return <RestaurantContext.Provider value={{ brand, branch, setBrand, setBranch }}>{children}</RestaurantContext.Provider>;
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error("useRestaurant must be within RestaurantContextProvider");
    }

    return context;
};
