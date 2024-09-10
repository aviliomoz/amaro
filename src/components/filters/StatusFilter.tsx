import { CopyCheck } from "lucide-react";
import { useFilter } from "../../hooks/useFilter";

export const StatusFilter = () => {
  const { value, setValue } = useFilter("status");

  return (
    <label className="flex items-center gap-2 text-sm  border shadow-sm rounded-md px-3 py-1">
      <CopyCheck className="w-4" />
      <span className="font-medium">Estado:</span>
      <select
        value={value || "active"}
        onChange={(e) => setValue(e.target.value)}
        className={`outline-none cursor-pointer`}
      >
        <option value={"all"}>Todo</option>
        <option value={"active"}>Activo</option>
        <option value={"inactive"}>Anulado</option>
      </select>
    </label>
  );
};
