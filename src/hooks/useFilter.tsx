import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (name: string, initialValue?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get(name) || initialValue || ""
  );

  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    if (value) {
      const timeout = setTimeout(
        () => updateSearchParams(),
        name === "search" ? 300 : 0
      );
      return () => clearTimeout(timeout);
    } else {
      updateSearchParams();
    }
  }, [value]);

  return { value, setValue };
};
