import { ChevronDown, Download } from "lucide-react"

export const DownloadButton = () => {
    return <button className="flex items-center gap-3 border rounded-md px-3 py-1.5 text-sm">
        <Download className="size-4" />
        <span>Descargar</span>
        <ChevronDown className="size-4" />
    </button>
}