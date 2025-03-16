import { CopyCheck } from "lucide-react";
import { useFilter } from "../../hooks/useFilter";

export const StatusFilter = () => {
  const [status, setStatus] = useFilter("status");

  return (
    <label className="flex items-center gap-2 text-sm  border shadow-sm rounded-md px-3 py-1">
      <CopyCheck className="w-4" />
      <span className="font-medium">Estado:</span>
      <select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value)}
        className={`outline-none cursor-pointer border-none bg-transparent`}
      >
        <option value={""}>Todo</option>
        <option value={"active"}>Activo</option>
        <option value={"inactive"}>Anulado</option>
      </select>
    </label>
  );
};
