import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { Restaurant } from "../schemas/restaurant.schema";
import { axiosAPI } from "../libs/axios";
import { APIResponse } from "../utils/types";
import { useAuth } from "../contexts/AuthContext";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantSelect = () => {
  const { user } = useAuth()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getRestaurant = async () => {
    setLoading(true)

    try {
      const { data } = await axiosAPI.get<APIResponse<{ restaurant: Restaurant }>>("/restaurants/current")
      setRestaurant(data.data.restaurant)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getRestaurants = async () => {
    const { data } = await axiosAPI.get<APIResponse<Restaurant[]>>(`/restaurants?userId=${user?.id}`);
    setRestaurants(data.data);
  };

  useEffect(() => {
    getRestaurant()
    getRestaurants();
  }, []);

  if (loading) return <LoaderCircle className="size-4 stroke-orange-500 animate-spin" />

  return (
    <div className="flex items-center relative">
      <span className="mr-2 font-thin text-3xl text-stone-300">/</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mr-4"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{restaurant?.name}</p>
        <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
        <ChevronsUpDown className="size-4" />
      </button>
      {isOpen && <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md p-2 flex flex-col gap-2">
        <h4 className="font-medium text-sm mb-1">Restaurantes:</h4>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>}
    </div>
  );
};
