import { FormEvent, useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import { Search, X } from "lucide-react";

type Props = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  const { value, setValue } = useFilter("search");
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setValue(search);
    setShow(false);
  };

  return (
    <>
      <input
        className="text-sm border rounded-md px-4 py-1.5 outline-none w-full max-w-96 shadow-sm hidden sm:block"
        type="text"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <div className="sm:hidden">
        <button
          onClick={() => setShow(!show)}
          className="flex justify-center items-center size-9 border rounded-md shadow-sm hover:bg-stone-100"
        >
          {show ? <X className="size-4" /> : <Search className="size-4" />}
        </button>
        {show && (
          <form className="absolute top-full mt-2 w-full p-2 flex justify-between items-center rounded-md border shadow-sm min-w-max left-0 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md outline-none text-sm px-2.5 py-1.5"
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="border-orange-600 bg-gradient-to-br from-orange-500 to-orange-600 text-sm text-white font-medium w-full py-1.5 rounded-md"
            >
              Buscar
            </button>
          </form>
        )}
      </div>
    </>
  );
};
