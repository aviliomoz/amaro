import { Ellipsis } from "lucide-react";
import { Category, ItemStatus } from "../../utils/types";

type Props = {
  category: Category;
};

const STATUSES: Record<ItemStatus, { name: string }> = {
  active: {
    name: "Activa",
  },
  inactive: {
    name: "Anulada",
  },
};

export const CategoryCard = ({ category }: Props) => {
  return (
    <li className="flex text-sm border rounded-md p-4 items-center justify-between bg-white shadow-sm hover:bg-stone-100 relative">
      <div className="flex justify-between w-full lg:flex-col gap-8 lg:gap-4">
        <p className="font-medium">{category.name}</p>
        <div className="flex items-center flex-wrap gap-2 mr-6">
          <span
            className={`text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md min-w-max`}
          >
            {STATUSES[category.status].name}
          </span>
          <span
            className={`text-xs font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md min-w-max`}
          >
            4 items
          </span>
        </div>
      </div>
      <button className="lg:absolute lg:top-4 lg:right-4">
        <Ellipsis className="size-4 stroke-stone-400 hover:stroke-stone-800" />
      </button>
    </li>
  );
};
