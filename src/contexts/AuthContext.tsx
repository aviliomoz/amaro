import { createContext, useContext, useLayoutEffect, useState } from "react"
import { APIResponse, UserType } from "../utils/types"
import { axiosAPI } from "../libs/axios"
import toast from "react-hot-toast"

type AuthContextType = {
    token?: string // accessToken
    user?: UserType,
    loading: boolean,
    checking: boolean,

    login: (email: string, password: string) => Promise<void>
    signup: (name: string, lastname: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<UserType | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [checking, setChecking] = useState<boolean>(true)

    useLayoutEffect(() => {
        const checkAuth = async () => {
            const { data } = await axiosAPI.get<APIResponse<{ user: UserType, accessToken: string }>>("/auth/check")

            if (data.ok) {
                setToken(data.data.accessToken)
                setUser(data.data.user)
            }

            setChecking(false)
        }

        try {
            checkAuth()
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [])

    const login = async (email: string, password: string) => {
        setLoading(true)

        try {
            const { data } = await axiosAPI.post<APIResponse<{ user: UserType, accessToken: string }>>("/auth/login", {
                email,
                password
            })

            if (data.ok) {
                setToken(data.data.accessToken)
                setUser(data.data.user)
            }
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const signup = async (name: string, lastname: string, email: string, password: string) => {
        console.log(name, lastname, email, password)
    }

    const logout = async () => {
        try {
            await axiosAPI.get("/auth/logout")
            setToken(undefined)
            setUser(undefined)
            location.assign("/login")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return <AuthContext.Provider value={{ token, loading, checking, user, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be within AuthContextProvider");
    }

    return context
}