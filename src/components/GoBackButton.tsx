import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {
    url?: string
}

export const GoBackButton = ({ url }: Props) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        if (url) {
            navigate(url)
        } else {
            navigate(-1)
        }
    }

    return <button onClick={handleNavigate} className="flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="size-4" />
        Volver
    </button>
}