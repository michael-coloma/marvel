import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetTopCharacters } from "src/marvel/core/application/usesCases/GetTopCharacters";
import { MarvelAdapter } from "src/marvel/infrastructure/api/adapters/MarvelAdapter";

export const useGetTopCharacters = () => {
  const marvelService = new MarvelAdapter();
  const getTopCharacters = new GetTopCharacters(marvelService);

  const {
    data: characters,
    error,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["getTopCharacters"],
    queryFn: () => getTopCharacters.execute(),
  });

  const result = useMemo(() => {
    return {
      characters: characters || [],
      isLoading: isLoading || isFetching,
      error,
      isError,
    };
  }, [characters, error, isError, isFetching, isLoading]);

  return result;
};
