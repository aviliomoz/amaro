import { useEffect, useState } from "react";
import { useRestaurant } from "../contexts/RestaurantContext";
import { axiosAPI } from "../libs/axios";
import { APIResponse, DeviceType, RestaurantType } from "../utils/types";
import toast from "react-hot-toast";

export const useDevice = () => {

    const { setRestaurant } = useRestaurant();
    const [deviceCode, setDeviceCode] = useState<string | null>(localStorage.getItem("deviceCode"));
    const [device, setDevice] = useState<DeviceType>();
    const [isLinked, setIsLinked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const generateNewDeviceCode = () => {
        let newCode = "";
        for (let i = 0; i < 10; i++) {
            newCode += Math.floor(Math.random() * 10).toString();
        }
        return newCode;
    }

    useEffect(() => {
        if (!deviceCode) {
            const newCode = generateNewDeviceCode();
            setDeviceCode(newCode);
            localStorage.setItem("deviceCode", newCode);
        }
    }, [])

    useEffect(() => {
        const checkDeviceLink = async () => {
            if (deviceCode) {
                try {
                    setLoading(true);
                    const { data: vinculatedRestaurants } = await axiosAPI.get<APIResponse<RestaurantType[]>>(`/devices/check-device/${deviceCode}`);

                    if (vinculatedRestaurants.data.length > 0) {
                        setRestaurant(vinculatedRestaurants.data[0] || null);
                        setIsLinked(true);
                        const { data: deviceData } = await axiosAPI.get<APIResponse<DeviceType>>(`/devices/${deviceCode}`);
                        setDevice(deviceData.data);
                    }

                } catch (error) {
                    toast.error("Error al verificar el estado del dispositivo.");
                } finally {
                    setLoading(false);
                }
            }
        }

        checkDeviceLink();
    }, [deviceCode]);

    return { device, deviceCode, isLinked, loading } as const;
}