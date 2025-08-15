import { ArrowLeftRight, BookUser, ChartNoAxesCombined, ClipboardList, Computer, FileText, Layers2, LayoutDashboard, LayoutList, MessageSquareText, MonitorCheck, NotebookText, QrCode, Settings, ShoppingBag, Truck, Users, Wallet } from "lucide-react";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";

export const Navigation = () => {

  return (
    <nav className="flex flex-col gap-4">

      <NavGroup title="MENU" >
        <NavLink icon={LayoutDashboard} url="/dashboard" >Resumen</NavLink>
        <NavLink icon={Layers2} base="/items" url="/items/products?status=active" >Ítems</NavLink>
        <NavLink icon={Computer} url="/registers" >Cajas</NavLink>
        <NavLink icon={Wallet} url="/sales" >Ventas</NavLink>
        <NavLink icon={MonitorCheck} url="/orders" >Pedidos</NavLink>
        <NavLink icon={BookUser} url="/customers" >Clientes</NavLink>
      </NavGroup>

      <NavGroup title="LOGÍSTICA" >
        <NavLink icon={ShoppingBag} url="/purchases" >Compras</NavLink>
        <NavLink icon={NotebookText} url="/requirements" >Requerimientos</NavLink>
        <NavLink icon={LayoutList} url="/productions" >Producciones</NavLink>
        <NavLink icon={ClipboardList} url="/inventories" >Inventarios</NavLink>
        <NavLink icon={Truck} url="/suppliers" >Proveedores</NavLink>
      </NavGroup>

      <NavGroup title="HERRAMIENTAS" >
        <NavLink icon={ArrowLeftRight} url="/converter" >Conversor</NavLink>
        <NavLink icon={MessageSquareText} url="/surveys" >Encuentas</NavLink>
        <NavLink icon={QrCode} url="/menus" >Cartas</NavLink>
      </NavGroup>

      <NavGroup title="ANÁLISIS" >
        <NavLink icon={ChartNoAxesCombined} url="/charts" >Gráficos</NavLink>
        <NavLink icon={FileText} url="/reports" >Reportes</NavLink>
      </NavGroup>

      <NavGroup title="OPCIONES" >
        <NavLink icon={Users} url="/users" >Usuarios</NavLink>
        <NavLink icon={Settings} url="/settings" >Ajustes</NavLink>
      </NavGroup>
    </nav>
  );
};
