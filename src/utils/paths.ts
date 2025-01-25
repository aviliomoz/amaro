import {
  ArrowLeftRight,
  BookMarked,
  LayoutList,
  LucideIcon,
  Settings,
  Users,
  NotebookText,
  ClipboardList,
  Truck,
  ShoppingBag,
  BookUser,
  HandPlatter,
  Printer,
  LayoutDashboard,
  Tags,
  Bookmark,
  ListOrdered,
  MessageSquareText,
  Layers2,
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
    paths: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
      {
        name: "Ítems",
        icon: Layers2,
        url: "/items",
      },
      {
        name: "Ventas",
        icon: HandPlatter,
        url: "/sales",
      },
      {
        name: "Clientes",
        icon: BookUser,
        url: "/customers",
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
      {
        name: "Encuestas",
        icon: MessageSquareText,
        url: "/surveys",
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
      {
        name: "Conteos",
        icon: ListOrdered,
        url: "/counts",
      },
    ],
  },
  {
    title: "FILTROS",
    paths: [
      {
        name: "Categorias",
        icon: Tags,
        url: "/categories"
      },
      {
        name: "Áreas",
        icon: Bookmark,
        url: "/areas"
      }
    ]
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
