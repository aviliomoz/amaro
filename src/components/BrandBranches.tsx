import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { APIResponse, Branch, Brand } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import { Plus } from "lucide-react"

export const BrandBranches = () => {

    const { brandSlug } = useParams()
    const [branches, setBranches] = useState<Branch[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getBranches = async () => {
            setLoading(true)

            try {
                const { data: brand } = await axiosAPI.get<APIResponse<Brand>>(`/brands/slug/${brandSlug}`)
                const { data: branches } = await axiosAPI.get<APIResponse<Branch[]>>(`/branches/brand/${brand.data.id}`)
                setBranches(branches.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getBranches()
    }, [brandSlug])

    if (loading) return <p>Cargando sucursales...</p>

    return <section>
        <div className="flex items-center justify-between">
            <h4 className="font-bold">Sucursales:</h4>
            <button className="flex items-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-4 py-1.5">
                <Plus className="size-4 stroke-white stroke-[3px]" />
                <span className="text-sm font-medium text-white">Nueva sucursal</span>
            </button>
        </div>
        <ul className="mt-4 grid gap-2 grid-cols-3">
            {branches.map(branch => <Link to={`/brands/${brandSlug}/branches/${branch.slug}/dashboard`} className="border rounded-md shadow-sm p-4 hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100">{branch.name}</Link>)}
        </ul>
    </section>
}