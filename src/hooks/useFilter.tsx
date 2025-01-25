import { useSearchParams } from "react-router-dom";

export function useFilter(name: string, initialValue: string = "") {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value: string) => {

    return setSearchParams((params) => {

      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params
    })

  };

  return [searchParams.get(name) || initialValue, updateSearchParams] as const;
};
