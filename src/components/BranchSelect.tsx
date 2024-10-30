import { useEffect, useState } from "react";
import { Branch } from "../utils/types";
import { useSession } from "../hooks/useSession";
import { ChevronsUpDown } from "lucide-react";

export const BranchSelect = () => {
  const { session, setSession } = useSession();
  const [branches, setBrands] = useState<Branch[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getBrands = (): void => {
    const { data } = {
      data: [
        { name: "Piura centro", id: "asdqwe4" },
        { name: "Ejidos plaza", id: "asdqwe5" },
      ],
    };

    setBrands(data);
  };

  const handleSelect = (branch: Branch) => {
    setSession({ ...session, branch });
    setIsOpen(false);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="flex items-center relative">
      <span className="mr-2 sm:mr-4 font-thin text-3xl text-stone-300">/</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-3 text-sm">
          {session.branch?.name}
        </p>{" "}
        <ChevronsUpDown className="size-4" />
      </button>
      {isOpen && (
        <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md p-2 flex flex-col gap-1 w-36">
          <h4 className="font-medium text-sm mb-1">Locales:</h4>
          {branches.map((branch) => (
            <button
              onClick={() => handleSelect(branch)}
              key={branch.id}
              className={`text-sm py-1 rounded-md text-left px-2 border border-transparent ${
                branch.id === session.branch?.id
                  ? "bg-stone-100 border-stone-300"
                  : "hover:bg-stone-50"
              }`}
            >
              {branch.name}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
