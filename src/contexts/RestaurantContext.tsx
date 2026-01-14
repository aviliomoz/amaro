import { createContext, useContext, useState } from "react";
import { Restaurant } from "@amaro-software/core";

type RestaurantContextType = {
    restaurant: Restaurant | undefined;
    setRestaurant: (restaurant: Restaurant) => void;
};

export const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [restaurant, setRestaurant] = useState<Restaurant>();

    return <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>{children}</RestaurantContext.Provider>;
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error("useRestaurant must be within RestaurantContextProvider");
    }

    return context;
};
