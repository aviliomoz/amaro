import { useSearchParams } from "react-router-dom";

export function useFilter(name: string, initialState: string = "") {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (value: string) => {
    setSearchParams((params) => {

      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params
    })
  }

  return [searchParams.get(name) || initialState, updateSearchParam] as const;
};
