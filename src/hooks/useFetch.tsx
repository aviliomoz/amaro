import { useAuth } from "../contexts/AuthContext"
import { axiosAPI } from "../libs/axios"
import { APIResponse } from "../utils/types"

type Method = "get" | "post" | "put" | "delete"

export const useFetch = () => {
    const { token } = useAuth()

    async function fetchWithToken<T>(method: Method, url: string, body?: Record<string, any>): Promise<APIResponse<T>> {
        const { data } = await axiosAPI[method]<APIResponse<T>>(url, body, { headers: { Authorization: `Bearer ${token}` } })

        return data
    }

    return { fetchWithToken }
}