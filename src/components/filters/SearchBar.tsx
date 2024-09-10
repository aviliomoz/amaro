import { useFilter } from "../../hooks/useFilter";

type Props = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  const { value, setValue } = useFilter("search");

  return (
    <input
      className="text-sm border rounded-md px-4 py-1.5 outline-none w-full max-w-96 shadow-sm"
      type="text"
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
