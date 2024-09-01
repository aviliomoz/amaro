import { Bell } from "lucide-react";

export const NotificationsButton = () => {
  return (
    <button className="border flex justify-center items-center size-9 text-sm rounded-full hover:bg-stone-50 shadow-sm">
      <Bell className="size-4" />
    </button>
  );
};
