import { UserPlus } from "lucide-react";

export const InviteUserButton = () => {
  return (
    <button className="hidden sm:flex bg-white font-medium text-sm rounded-full px-4 py-2 hover:bg-stone-100 border shadow-sm items-center gap-2">
      <UserPlus className="size-4" />
      Invitar
    </button>
  );
};
