import { useLayoutEffect, useState } from "react"
import { LinkButton } from "../components/ui/LinkButton"
import { Plus } from "lucide-react"
import { BranchWithBrandName } from "../schemas/branch.schema"
import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { APIResponse } from "../utils/types"
import toast from "react-hot-toast"
import { RestaurantCard } from "../components/RestaurantCard"

export const RestaurantsPage = () => {

    const { user } = useAuth()
    const [branches, setBranches] = useState<BranchWithBrandName[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getBranches = async () => {
            try {
                const { data } = await axiosAPI<APIResponse<BranchWithBrandName[]>>(`/branches?userId=${user?.id}`)
                setBranches(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getBranches()
    }, [])

    return <section className="bg-stone-50 h-screen rounded-lg p-6">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Tus restaurantes:</h2>
            <LinkButton icon={Plus} url="/restaurants/new">Nuevo restaurante</LinkButton>
        </div>
        {loading
            ? <p>Cargando restaurantes...</p>
            : <ul className="flex gap-3 mt-4">
                {branches.sort((a, b) => a.brand_name.localeCompare(b.brand_name)).map(branch => <RestaurantCard key={branch.id} restaurant={branch} />)}
            </ul>
        }
    </section>
}