import { Link, Outlet, useNavigate } from "react-router-dom"
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { LogoLink } from "../components/LogoLink";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useAuth } from "../contexts/AuthContext";
import { PosNavigation } from "../components/PosNavigation";
import { useDevice } from "../hooks/useDevice";
import { useEffect } from "react";

export const PosLayout = () => {

    const navigate = useNavigate()
    const { user } = useAuth()
    const { restaurant } = useRestaurant()
    const { device, deviceCode, isLinked, loading } = useDevice();

    useEffect(() => {
        if (device) {
            if (device.role === "cashier") {
                navigate("/pos/registers")
            }
            else if (device.role === "waiter") {
                navigate("/pos/halls")
            }
            else if (device.role === "production") {
                navigate("/pos/orders")
            }
        }
    }, [device])

    if (!deviceCode || loading) return <LoadingScreen />

    if (deviceCode && !isLinked) return <main className="flex flex-col items-center pt-40 min-h-screen">
        <LogoLink />
        <p className="mt-6">Tu dispositivo no se encuentra vinculado a ningún restaurante.</p>
        <p>Utiliza el siguiente código para vincularlo:</p>
        <span className="text-5xl font-black mt-10 tracking-widest">{deviceCode}</span>
        </main>

    return <>
        <header className="flex items-center justify-between h-16 fixed top-0 left-0 right-0 bg-white px-10 z-50">
            <div className="flex items-center gap-4">
                <LogoLink/>
                <span className="font-extralight text-2xl text-stone-300">/</span>
                <span className="font-medium">Punto de Venta</span>
                <span className="font-extralight text-2xl text-stone-300">/</span>
                <span className="font-medium">{restaurant?.name}</span>
            </div>
            {user && <Link to={`/restaurants/${restaurant?.slug}/dashboard`} className="text-stone-500 hover:text-stone-700 transition-colors text-sm font-medium">
                Ir al módulo administrativo
            </Link>}
        </header>
        <aside className="fixed top-16 left-0 bg-white pl-10 py-4 z-50 w-44 h-[calc(100vh-64px)] overflow-y-scroll custom-scroll">
            <PosNavigation />
        </aside>
        <main className="pt-20 pl-48 pr-10"><Outlet /></main>
    </>
}