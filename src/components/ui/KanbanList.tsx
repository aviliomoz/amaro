import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export const KanbanList = ({ title, icon: Icon, children }: Props) => {
  return (
    <div className="bg-stone-50 p-4 rounded-md w-full text-sm border">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="size-4" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
};
