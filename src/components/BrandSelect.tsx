import { useEffect, useState } from "react";
import { Brand } from "../utils/types";
import { useSession } from "../hooks/useSession";
import { ChevronsUpDown } from "lucide-react";

export const BrandSelect = () => {
  const { session, setSession } = useSession();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getBrands = (): void => {
    const { data } = {
      data: [
        { name: "Bonsai", id: "asdqwe1", plan: "PRO" },
        { name: "Qarbon", id: "asdqwe2", plan: "PRO" },
      ],
    };

    setBrands(data);
  };

  const handleSelect = (brand: Brand) => {
    setSession({ ...session, brand });
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
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">
          {session.brand?.name}
          <span className="text-[9px] font-bold bg-gray-100 rounded-md px-2 py-0.5 tracking-wider">
            PRO
          </span>
        </p>{" "}
        <ChevronsUpDown className="size-4" />
      </button>
      {isOpen && (
        <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md p-2 flex flex-col gap-1 w-36">
          <h4 className="font-medium text-sm mb-1">Marcas:</h4>
          {brands.map((brand) => (
            <button
              onClick={() => handleSelect(brand)}
              key={brand.id}
              className={`text-sm py-1 rounded-md text-left px-2 border border-transparent ${
                brand.id === session.brand?.id
                  ? "bg-stone-100 border-stone-300"
                  : "hover:bg-stone-50"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
