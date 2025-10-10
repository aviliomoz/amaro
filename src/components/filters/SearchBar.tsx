import { useEffect, useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import { useLocation } from "react-router-dom";

type Props = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  const { pathname } = useLocation()
  const [search, setSearch] = useFilter<string>("search");
  const [page, setPage] = useFilter<string>("page");
  const [localSearch, setLocalSearch] = useState<string>("");

  useEffect(() => {
    setLocalSearch("")
  }, [pathname])

  useEffect(() => {
    const debouncedSetSearch = setTimeout(() => {
      setSearch(localSearch)
      console.log("Search set to:", localSearch)
    }, 600)

    return () => {
      clearTimeout(debouncedSetSearch)
    }
  }, [localSearch])

  useEffect(() => {
    if (page) {
      setPage("")
    }
  }, [search])

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
