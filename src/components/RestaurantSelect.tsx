import { ChevronDown, LoaderCircle } from "lucide-react";
import { useRestaurant } from "../contexts/RestaurantContext";

export const RestaurantSelect = () => {

  const { restaurant } = useRestaurant()

  if (!restaurant) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

  return (
    <div className="flex items-center relative">
      <span className="mr-4 font-extralight text-2xl text-stone-300">/</span>
      <button
        className="flex items-center gap-3 mr-2 border rounded-md bg-stone-50 px-4 py-1.5 text-sm font-medium text-stone-900 hover:bg-stone-100"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{restaurant.name}</p>
        {/* <span className="text-[10px] font-bold tracking-wider text-orange-500">PRO</span> */}
        <ChevronDown className="size-4 ml-1" />
      </button>
    </div>
  );
};
