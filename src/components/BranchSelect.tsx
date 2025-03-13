import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useRestaurant } from "../contexts/RestaurantContext";

export const BranchSelect = () => {

  const { brand, branch } = useRestaurant()

  if (!brand || !branch) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

  return (
    <div className="flex items-center relative">
      <span className="mr-2 font-thin text-3xl text-stone-300">/</span>
      <button
        className="flex items-center gap-2 mr-2"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{brand.name}</p>
        <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
      </button>
      <span className="mr-2 font-thin text-3xl text-stone-300">/</span>
      <button
        className="flex items-center gap-2 mr-2"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{branch.name}</p>
        <ChevronsUpDown className="size-4" />
      </button>
    </div>
  );
};
