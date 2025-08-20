import { Link } from "react-router-dom"
import { LoginForm } from "../components/auth/LoginForm"

export const AuthPage = () => {
    return <div className="flex flex-col items-center justify-center w-screen gap-6">
        <LoginForm />
        <Link className="flex justify-center border rounded-md shadow-sm px-6 py-2 text-sm font-medium hover:shadow-md hover:bg-stone-50 transition-all ease-in-out" to="/pos">Ingresar en modo POS</Link>
    </div>
}