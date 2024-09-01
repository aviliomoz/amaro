import { Menu } from "lucide-react";

export const MobileMenuButton = () => {
  return (
    <button className="sm:hidden size-9 border flex justify-center items-center rounded-full hover:bg-stone-50">
      <Menu className="size-4" />
    </button>
  );
};
