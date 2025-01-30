import { useEffect, useState } from "react";
import { useFilter } from "../../hooks/useFilter";

type Props = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  const [search, setSearch] = useFilter("search");
  const [localSearch, setLocalSearch] = useState<string>(search)

  useEffect(() => {
    const debouncedSetSearch = setTimeout(() => {
      setSearch(localSearch)
    }, 400)

    return () => {
      clearTimeout(debouncedSetSearch)
    }
  }, [localSearch])

  return (
    <>
      <input
        className="text-sm border rounded-md px-4 py-1.5 outline-none w-full max-w-96 shadow-sm hidden sm:block"
        type="text"
        placeholder={placeholder}
        onChange={(e) => setLocalSearch(e.target.value)}
        value={localSearch}
      />
    </>
  );
};
