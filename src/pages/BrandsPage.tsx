import toast from "react-hot-toast"
import { useLayoutEffect, useState } from "react"
import { Plus, SquareMousePointer } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { APIResponse, Brand } from "../utils/types"
import { BrandCard } from "../components/BrandCard"
import { Outlet, useParams } from "react-router-dom"

export const BrandsPage = () => {

    const { brandSlug } = useParams()
    const { user } = useAuth()
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useLayoutEffect(() => {
        const getBrands = async () => {
            try {
                const { data } = await axiosAPI<APIResponse<Brand[]>>(`/brands/user/${user?.id}`)
                setBrands(data.data)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getBrands()
    }, [])

    return <>
        <title>SISTEMA - Marcas y sucursales</title>
        <section className="bg-stone-100 shadow-sm h-screen rounded-lg p-4 grid grid-cols-12 gap-4">
            <div className="bg-white rounded-md p-4 col-span-4 shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold">Tus marcas:</h2>
                    <button className="flex items-center gap-2 text-sm font-medium"><Plus className="size-4"/>Nueva marca</button>
                </div>
                {loading
                    ? <p>Cargando marcas...</p>
                    : <ul className="flex gap-2 mt-4 flex-col">
                        {brands.sort((a, b) => a.name.localeCompare(b.name)).map(brand => <BrandCard key={brand.id} brand={brand} />)}
                    </ul>
                }
            </div>
            <div className="bg-white rounded-md p-4 col-span-8 shadow-md">
                {!brandSlug ? <div className="border-dashed border-[2px] border-stone-100 rounded-lg flex h-full justify-center items-center flex-col gap-3">
                    <SquareMousePointer className="stroke-stone-400 size-8" />
                    <p className="max-w-80 text-center text-stone-400 text-sm">Selecciona una marca para ver sus sucursales.</p>
                </div>
                    : <Outlet />}
            </div>
        </section>
    </>
}