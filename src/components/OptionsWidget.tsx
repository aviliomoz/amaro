import { Bell, Moon, PhoneCall } from "lucide-react"

export const OptionsWidget = () => {
    return <div className="flex items-center gap-2">
        <button className="size-8 flex items-center justify-center border rounded-full p-2 hover:bg-stone-50"><Bell className="size-4" /></button>
        <button className="size-8 flex items-center justify-center border rounded-full p-2 hover:bg-stone-50"><PhoneCall className="size-4" /></button>
        <button className="size-8 flex items-center justify-center border rounded-full p-2 hover:bg-stone-50"><Moon className="size-4" /></button>
    </div>
}