import { LucideIcon } from "lucide-react";

type Props = {
  children: React.ReactNode,
  title: string,
  icon: LucideIcon
}

export const CardsList = ({ children, title, icon: Icon }: Props) => {
  return (
    <div className="bg-stone-50 p-4 rounded-md w-full text-sm border flex-wrap">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="size-4" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="grid grid-cols-4 gap-2">{children}</ul>
    </div>
  );
};
