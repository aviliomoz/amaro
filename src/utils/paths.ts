import {
  ArrowLeftRight,
  Beef,
  BookMarked,
  ChefHat,
  CookingPot,
  CopyCheck,
  Grid2X2,
  Layers3,
  LayoutList,
  ListOrdered,
  ListTodo,
  LucideIcon,
  Salad,
  // Printer,
  Settings,
  Users,
  Warehouse,
} from "lucide-react";

type Path = {
  name: string;
  icon: LucideIcon;
  url: string;
};

type PathGroup = {
  title: string;
  paths: Path[];
};

export const PATHS: PathGroup[] = [
  {
    title: "ITEMS",
    paths: [
      {
        name: "Insumos",
        icon: Beef,
        url: "/restaurant/items/supplies",
      },
      {
        name: "Subproductos",
        icon: CookingPot,
        url: "/restaurant/items/subproducts",
      },
      {
        name: "Productos",
        icon: Salad,
        url: "/restaurant/items/products",
      },
      {
        name: "Combos",
        icon: Layers3,
        url: "/restaurant/items/combos",
      },
    ],
  },
  // {
  //   title: "OPERACIONES",
  //   paths: [
  //     {
  //       name: "Caja",
  //       icon: ListOrdered,
  //       url: "/restaurant/controls/counts",
  //     },
  //     {
  //       name: "Ventas",
  //       icon: ListTodo,
  //       url: "/restaurant/controls/requirements",
  //     },
  //     {
  //       name: "Clientes",
  //       icon: LayoutList,
  //       url: "/restaurant/controls/productions",
  //     },
  //   ],
  // },
  // {
  //   title: "LOGÍSTICA",
  //   paths: [
  //     {
  //       name: "Compras",
  //       icon: ListTodo,
  //       url: "/restaurant/controls/requirements",
  //     },
  //     {
  //       name: "Proveedores",
  //       icon: LayoutList,
  //       url: "/restaurant/controls/productions",
  //     },
  //     {
  //       name: "Inventarios",
  //       icon: ListOrdered,
  //       url: "/restaurant/controls/counts",
  //     },
  //   ],
  // },
  {
    title: "CONTROLES",
    paths: [
      {
        name: "Requerimientos",
        icon: ListTodo,
        url: "/restaurant/controls/requirements",
      },
      {
        name: "Producciones",
        icon: LayoutList,
        url: "/restaurant/controls/productions",
      },
      {
        name: "Conteos",
        icon: ListOrdered,
        url: "/restaurant/controls/counts",
      },
    ],
  },
  {
    title: "HERRAMIENTAS",
    paths: [
      {
        name: "Matriz IM",
        icon: Grid2X2,
        url: "/restaurant/tools/matrix",
      },
      {
        name: "Conversor",
        icon: ArrowLeftRight,
        url: "/restaurant/tools/converter",
      },
      {
        name: "Libro recetario",
        icon: BookMarked,
        url: "/restaurant/tools/book",
      },
    ],
  },
  {
    title: "AJUSTES",
    paths: [
      {
        name: "General",
        icon: Settings,
        url: "/restaurant/settings/general",
      },
      {
        name: "Equipo",
        icon: Users,
        url: "/restaurant/settings/team",
      },
      {
        name: "Categorias",
        icon: CopyCheck,
        url: "/restaurant/settings/categories",
      },
      {
        name: "Áreas",
        icon: ChefHat,
        url: "/restaurant/settings/areas",
      },
      {
        name: "Almacenes",
        icon: Warehouse,
        url: "/restaurant/settings/warehouses",
      },
      // {
      //   name: "Impresoras",
      //   icon: Printer,
      //   url: "/restaurant/settings/warehouses",
      // },
    ],
  },
];
