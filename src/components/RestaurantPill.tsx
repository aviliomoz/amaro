import { ChevronDown } from "lucide-react";

export const RestaurantPill = () => {
  return (
    <div className="flex items-center ">
      <span className="mr-2 sm:mr-4 font-thin text-3xl text-stone-300">/</span>
      <button className="flex items-center gap-1 sm:gap-2 bg-white rounded-md px-2 sm:px-3 py-1.5 border hover:bg-stone-100 text-sm font-medium shadow-sm">
        <span className="truncate max-w-20 sm:max-w-96">Ohanna</span>
        <span className="text-[10px] font-semibold bg-orange-100 rounded-md px-2 tracking-wider">
          PRO
        </span>
        <ChevronDown className="size-4 ml-1" />
      </button>
    </div>
  );
};
