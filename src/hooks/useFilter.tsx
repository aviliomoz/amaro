import { useSearchParams } from "react-router-dom";

export function useFilter<T>(name: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (value: string | null) => {
    setSearchParams((params) => {

      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params
    })
  }

  return [searchParams.get(name) as T, updateSearchParam] as const;
};
