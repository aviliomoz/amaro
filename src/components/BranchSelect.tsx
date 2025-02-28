import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { APIResponse, Branch, Brand } from "../utils/types";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosAPI } from "../libs/axios";

export const BranchSelect = () => {

  const { branch_id } = useParams()
  const [brand, setBrand] = useState<Brand>()
  const [branch, setBranch] = useState<Branch>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getBranch = async () => {
      setLoading(true)

      try {
        const { data: branch } = await axiosAPI.get<APIResponse<Branch>>(`/branches/${branch_id}`)

        console.log(branch)

        const { data: brand } = await axiosAPI.get<APIResponse<Brand>>(`/brands/${branch.data.brand_id}`)

        setBrand(brand.data)
        setBranch(branch.data)
      } catch (error) {
        toast.error((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    getBranch()
  }, [])

  if (loading || !brand || !branch) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

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
