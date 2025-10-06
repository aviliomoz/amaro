import { ArrowLeftRight, BookUser, ChartNoAxesCombined, ClipboardList, FileText, Layers2, LayoutDashboard, LayoutList, MessageSquareText, NotebookText, QrCode, Settings, ShoppingBag, Truck, Users, Wallet } from "lucide-react";
import { NavLink } from "./NavLink";
import { useRestaurant } from "../contexts/RestaurantContext";
import { NavSeparator } from "./ui/NavSeparator";

export const Navigation = () => {

  const { restaurant } = useRestaurant()

  return (
    <nav className="flex flex-col gap-0.5">

      {restaurant ? <>
        <NavLink icon={LayoutDashboard} url="/dashboard" text="Resumen" />
        <NavLink icon={Layers2} base="/items" url="/items/products?status=active&page=1" text="Items" />
        <NavLink icon={Wallet} url="/sales" text="Ventas" />
        <NavLink icon={BookUser} url="/customers" text="Clientes" />

        <NavSeparator />

        <NavLink icon={ShoppingBag} url="/purchases" text="Compras" />
        <NavLink icon={NotebookText} url="/requirements" text="Requerimientos" />
        <NavLink icon={LayoutList} url="/productions" text="Producciones" />
        <NavLink icon={ClipboardList} url="/inventories" text="Inventarios" />
        <NavLink icon={Truck} url="/suppliers" text="Proveedores" />

        <NavSeparator />

        <NavLink icon={ArrowLeftRight} url="/converter" text="Conversor" />
        <NavLink icon={MessageSquareText} url="/surveys" text="Encuentas" />
        <NavLink icon={QrCode} url="/menus" text="Cartas" />

        <NavSeparator />

        <NavLink icon={ChartNoAxesCombined} url="/charts" text="Gráficos" />
        <NavLink icon={FileText} url="/reports" text="Reportes" />

        <NavSeparator />

        <NavLink icon={Users} url="/users" text="Usuarios" />
        <NavLink icon={Settings} url="/settings" text="Ajustes" />
      </> : <>
        <NavLink icon={Users} url="/users" text="Usuarios" />
        <NavLink icon={Settings} url="/settings" text="Ajustes" />
      </>}
    </nav>
  );
};
