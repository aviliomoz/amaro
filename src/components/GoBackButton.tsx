import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const GoBackButton = () => {
    const navigate = useNavigate()
    
    return <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="size-4" />
        Volver
    </button>
}