import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { axiosAPI } from "../libs/axios";
import { APIResponse, RestaurantType } from "../utils/types";
import { LogoLink } from "../components/LogoLink";

export const PosLayout = () => {

    const [deviceCode, setDeviceCode] = useState<string | null>(localStorage.getItem("deviceCode"));
    const [isLinked, setIsLinked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const generateNewDeviceCode = () => {
            let newCode = "";
            for (let i = 0; i < 10; i++) {
                newCode += Math.floor(Math.random() * 10).toString();
            }
            return newCode;
        }

        if (!deviceCode) {
            setDeviceCode(generateNewDeviceCode());
            localStorage.setItem("deviceCode", generateNewDeviceCode());
        }

    }, [])

    useEffect(() => {
        const checkDeviceLink = async () => {
            if (deviceCode) {
                try {
                    setLoading(true);
                    const { data: vinculatedRestaurants } = await axiosAPI.get<APIResponse<RestaurantType[]>>(`/devices/check-device/${deviceCode}`);
                    setIsLinked(vinculatedRestaurants.data.length > 0);
                } catch (error) {
                    toast.error("Error al verificar el estado del dispositivo.");
                } finally {
                    setLoading(false);
                }
            }
        }

        checkDeviceLink();
    }, [deviceCode]);

    if (!deviceCode || loading) return <LoadingScreen />

    if (deviceCode && !isLinked) return <main className="flex flex-col items-center justify-center min-h-screen">
        <LogoLink width="xl" />
        <p className="mt-6">Tu dispositivo no se encuentra vinculado a ningún restaurante.</p>
        <p>Utiliza el siguiente código para vincularlo:</p>
        <span className="text-5xl font-black mt-10 tracking-widest">{deviceCode}</span>
    </main>

    return <Outlet />
}