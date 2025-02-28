import { Ellipsis } from "lucide-react";
import { Category } from "../../utils/types";
import { Link } from "react-router-dom";

type Props = {
  category: Category;
};

export const CategoryCard = ({ category }: Props) => {
  return (
    <Link to={`/categories/${category.id}`} className="flex flex-col gap-3 text-sm border cursor-pointer w-full max-w-80 rounded-md p-4 bg-white shadow-sm hover:bg-gradient-to-br hover:from-white hover:to-stone-50 hover:shadow-md transition-all duration-100">
      <div className="flex items-center justify-between w-full gap-3">
        <p className="font-medium">{category.name}</p>
        <button onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log("hola")
        }}>
          <Ellipsis className="size-4 stroke-stone-400 hover:stroke-stone-800" />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <span className={`bg-gradient-to-br from-white to-stone-50 border text-xs font-medium ${category.status === "active" ? "text-green-500" : "text-red-500"} rounded-lg px-2 py-0.5`}>{category.status === "active" ? "Activa" : "Inactiva"}</span>
        <span className={`bg-gradient-to-br from-white to-stone-50 border text-xs font-medium text-stone-500 rounded-lg px-2 py-0.5`}>4 Ítems</span>
      </div>
    </Link>
  );
};
