import { Beef, CookingPot, Layers3, LucideIcon, Salad } from "lucide-react";
import { Category, ItemType } from "../../utils/types";
import { KanbanList } from "../ui/KanbanList";
import { CategoryCard } from "./CategoryCard";

type Props = {
  type: ItemType;
};

const TYPES: Record<ItemType, { title: string; icon: LucideIcon }> = {
  supply: {
    title: "Insumos",
    icon: Beef,
  },
  subproduct: {
    title: "Subproductos",
    icon: CookingPot,
  },
  product: {
    title: "Productos",
    icon: Salad,
  },
  combo: {
    title: "Combos",
    icon: Layers3,
  },
};

const category: Category = {
  id: "asd",
  name: "Prueba",
  status: "active",
};

export const CategoriesList = ({ type }: Props) => {
  return (
    <KanbanList title={TYPES[type].title} icon={TYPES[type].icon}>
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
    </KanbanList>
  );
};
