import { ChevronDown } from "lucide-react";

export const UserPill = () => {
  return (
    <button className="text-sm flex items-center gap-1 sm:gap-3 sm:border rounded-full sm:px-2 sm:py-1.5 hover:bg-stone-100 shadow-sm">
      <span className="bg-stone-900 text-white flex justify-center items-center size-9 sm:size-6 rounded-full font-medium">
        A
      </span>
      <p className="hidden sm:block">Avilio Muñoz</p>
      <ChevronDown className="size-4 hidden sm:block" />
    </button>
  );
};
