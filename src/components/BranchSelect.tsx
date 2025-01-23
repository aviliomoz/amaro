import { useEffect, useState } from "react";
import { Brand } from "../schemas/brand.schema";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { Branch, BranchWithBrandName } from "../schemas/branch.schema";
import { axiosAPI } from "../libs/axios";
import { APIResponse } from "../utils/types";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { RestaurantCard } from "./RestaurantCard";

export const BranchSelect = () => {
  const { user } = useAuth()
  const [brand, setBrand] = useState<Brand>()
  const [branch, setBranch] = useState<Brand>()
  const [branches, setBranches] = useState<BranchWithBrandName[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getBranch = async () => {
    setLoading(true)

    try {
      const { data } = await axiosAPI.get<APIResponse<{ brand: Brand, branch: Branch }>>("/branches/current")
      setBrand(data.data.brand)
      setBranch(data.data.branch)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getBranches = async () => {
    const { data } = await axiosAPI.get<APIResponse<BranchWithBrandName[]>>(`/branches?userId=${user?.id}`);
    setBranches(data.data);
  };

  useEffect(() => {
    getBranch()
    getBranches();
  }, []);

  if (loading) return <LoaderCircle className="size-4 stroke-orange-500 animate-spin" />

  return (
    <div className="flex items-center relative">
      <span className="mr-2 font-thin text-3xl text-stone-300">/</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mr-4"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{brand?.name}</p>
        <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">PRO</span>
        <span className="mr-2 font-thin text-3xl text-stone-300">/</span>
        <p className="truncate max-w-20 sm:max-w-96 text-sm">{branch?.name}</p>
        <ChevronsUpDown className="size-4" />
      </button>
      {isOpen && <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md p-2 flex flex-col gap-2">
        <h4 className="font-medium text-sm mb-1">Restaurantes:</h4>
        {branches.map((br) => (
          <RestaurantCard key={br.id} restaurant={br} />
        ))}
      </ul>}
    </div>
  );
};
