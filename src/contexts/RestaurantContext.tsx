import { createContext, useContext, useState } from "react";
import { RestaurantType } from "../utils/types";

type RestaurantContextType = {
    restaurant: RestaurantType | undefined;
    setRestaurant: (restaurant: RestaurantType) => void;
};

export const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [restaurant, setRestaurant] = useState<RestaurantType>();

    return <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>{children}</RestaurantContext.Provider>;
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error("useRestaurant must be within RestaurantContextProvider");
    }

    return context;
};
