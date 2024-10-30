import {
  ArrowLeftRight,
  Beef,
  BookMarked,
  CookingPot,
  Layers3,
  LayoutList,
  LucideIcon,
  Salad,
  Settings,
  Users,
  NotebookText,
  Store,
  ClipboardList,
  Truck,
  ShoppingBag,
  BookUser,
  HandPlatter,
  Package,
  Printer,
  LayoutDashboard,
  MonitorCheck,
  MonitorSmartphone,
} from "lucide-react";

type Path = {
  name: string;
  icon: LucideIcon;
  url: string;
};

type PathGroup = {
  title?: string;
  paths: Path[];
};

export const PATHS: PathGroup[] = [
  {
    title: "MENU",
    paths: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
      {
        name: "Caja",
        icon: MonitorSmartphone,
        url: "/register",
      },
      {
        name: "Ventas",
        icon: HandPlatter,
        url: "/sales",
      },
      {
        name: "Monitor",
        icon: MonitorCheck,
        url: "/monitor",
      },
      {
        name: "Clientes",
        icon: BookUser,
        url: "/customers",
      },
    ],
  },
  {
    title: "ITEMS",
    paths: [
      {
        name: "Insumos",
        icon: Beef,
        url: "/supplies",
      },
      {
        name: "Subproductos",
        icon: CookingPot,
        url: "/subproducts",
      },
      {
        name: "Productos",
        icon: Salad,
        url: "/products",
      },
      {
        name: "Combos",
        icon: Layers3,
        url: "/combos",
      },
      {
        name: "Paquetes",
        icon: Package,
        url: "/packs",
      },
    ],
  },
  {
    title: "HERRAMIENTAS",
    paths: [
      {
        name: "Conversor",
        icon: ArrowLeftRight,
        url: "/converter",
      },
      {
        name: "Libro recetario",
        icon: BookMarked,
        url: "/book",
      },
    ],
  },
  {
    title: "LOGÍSTICA",
    paths: [
      {
        name: "Compras",
        icon: ShoppingBag,
        url: "/purchases",
      },
      {
        name: "Proveedores",
        icon: Truck,
        url: "/suppliers",
      },
      {
        name: "Inventarios",
        icon: ClipboardList,
        url: "/inventories",
      },
      {
        name: "Requerimientos",
        icon: NotebookText,
        url: "/requirements",
      },
      {
        name: "Producciones",
        icon: LayoutList,
        url: "/productions",
      },
    ],
  },

  {
    title: "AJUSTES",
    paths: [
      {
        name: "General",
        icon: Settings,
        url: "/settings",
      },
      {
        name: "Locales",
        icon: Store,
        url: "/branches",
      },
      {
        name: "Usuarios",
        icon: Users,
        url: "/users",
      },
      {
        name: "Impresoras",
        icon: Printer,
        url: "/printers",
      },
    ],
  },
];
