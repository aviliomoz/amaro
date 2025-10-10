import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export const UserPill = () => {

  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="text-sm font-medium flex items-center gap-1 sm:gap-2 border rounded-full p-1 hover:bg-stone-100 shadow-sm">
        <span className="bg-stone-900 text-white text-xs flex justify-center items-center size-6 rounded-full font-semibold font-logo">
          {user?.name.split("")[0]}
        </span>
        <p className="hidden sm:block font-medium">{user?.name} {user?.lastname}</p>
        <ChevronDown className="size-4 hidden sm:block" />
      </button>
      {isOpen && <ul className="absolute right-0 top-full mt-2 border rounded-md p-2 shadow-sm bg-white min-w-max">
        <button onClick={() => logout()} className="px-3 py-1 rounded-md hover:bg-stone-100 text-sm flex items-center gap-2"><LogOut className="size-4" />Cerrar sesión</button>
      </ul>}
    </div>
  );
};
