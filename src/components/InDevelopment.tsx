import { Blocks } from "lucide-react";

export const InDevelopment = () => {
  return (
    <div className="w-full h-[400px] flex flex-col gap-3 justify-center items-center">
      <Blocks className="size-8 stroke-stone-400" />
      <p className="text-md text-stone-400">Módulo en desarrollo</p>
    </div>
  );
};
