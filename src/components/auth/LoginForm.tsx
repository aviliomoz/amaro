import { FormEvent, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import toast from "react-hot-toast"

export const LoginForm = () => {

    const { login, loading } = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = async (e: FormEvent) => {

        e.preventDefault()

        try {
            await login(email, password)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return <form onSubmit={handleLogin} className="border rounded-md p-6 shadow-sm flex flex-col">
        <h2 className="text-center font-semibold">Inicio de sesión</h2>
        <label className="flex flex-col gap-1 mt-4">
            <strong className="text-sm">Email</strong>
            <input className="border rounded-lg px-3 py-1 outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 mt-4">
            <strong className="text-sm">Password</strong>
            <input className="border rounded-lg px-3 py-1 outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="mt-6 bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-orange-600 font-medium" type="submit">{loading ? "Validando.." : "Entrar"}</button>
    </form>
}