import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { GetCharacterDetails } from "src/marvel/core/application/usesCases/GetCharacterDetails";
import { MarvelAdapter } from "src/marvel/infrastructure/api/adapters/MarvelAdapter";

export const useGetCharacterDetails = (characterId: string) => {
  const podcastService = new MarvelAdapter();
  const getCharacterDetails = new GetCharacterDetails(podcastService);

  const {
    data: characterDetails,
    error,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["characterDetails", `${characterId}`],
    queryFn: () => getCharacterDetails.execute(characterId),
  });

  const result = useMemo(
    () => ({ characterDetails: characterDetails || null, isLoading: isLoading || isFetching, error, isError }),
    [characterDetails, error, isError, isFetching, isLoading],
  );

  return result;
};
