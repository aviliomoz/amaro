import { Computer, LayoutGrid, LucideIcon, MonitorCheck } from "lucide-react";
import { NavGroup } from "./NavGroup";
import { useDevice } from "../hooks/useDevice";
import { Link, useLocation } from "react-router-dom";

const PosNavLink = ({ url, children, icon: Icon, blocked = false }: { url: string; children: string; icon: LucideIcon, blocked?: boolean }) => {
    const location = useLocation()
    const isActive = location.pathname.includes(url);

    if (blocked) {
        return <div className="flex items-center gap-3 flex-grow cursor-not-allowed text-sm px-2 py-1 border border-transparent">
            <Icon className="size-4" />
            <span className="">{children}</span>
        </div>
    }

    return <Link to={url} className={`w-full text-left flex items-center gap-3 text-sm px-2 py-1 rounded-md border ${isActive ? "border-stone-200 bg-stone-100 shadow-sm" : "hover:bg-stone-100 border-transparent"}`}>
        <div className="flex items-center gap-3 flex-grow">
            <Icon className="size-4" />
            <span className="">{children}</span>
        </div>
    </Link>
}

export const PosNavigation = () => {
    const { device } = useDevice()
    console.log(device);

    return (
        <nav className="flex flex-col gap-4">
            <NavGroup title="MENU">
                <PosNavLink url="/pos/registers" blocked={!["cashier"].includes(device?.role!)} icon={Computer}>Cajas</PosNavLink>
                <PosNavLink url="/pos/halls" blocked={!["cashier", "waiter"].includes(device?.role!)} icon={LayoutGrid}>Salones</PosNavLink>
                <PosNavLink url="/pos/orders" blocked={!["cashier", "waiter", "production"].includes(device?.role!)} icon={MonitorCheck}>Pedidos</PosNavLink>
            </NavGroup>
        </nav>
    );
}

