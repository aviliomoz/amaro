import { Outlet, useParams } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { useRestaurant } from "../contexts/RestaurantContext"
import { useLayoutEffect, useState } from "react"
import { axiosAPI } from "../libs/axios"
import { APIResponse, Branch, Brand } from "../utils/types"
import toast from "react-hot-toast"

export const RestaurantLayout = () => {

    const { brandSlug, branchSlug } = useParams()
    const { brand, branch, setBrand, setBranch } = useRestaurant()
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getRestaurant = async () => {
            setLoading(true);
            try {
                // Obtener la marca
                const { data: brandData } = await axiosAPI.get<APIResponse<Brand>>(`/brands/slug/${brandSlug}`);
                setBrand(brandData.data);

                // Obtener la sucursal usando la marca obtenida
                const { data: branchData } = await axiosAPI.get<APIResponse<Branch>>(`/branches/brand/${brandData.data.id}/slug/${branchSlug}`);
                setBranch(branchData.data);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (brandSlug && branchSlug) {
            getRestaurant();
        }
    }, [brandSlug, branchSlug]);

    if (loading || !brand || !branch) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

    return <Outlet />
}