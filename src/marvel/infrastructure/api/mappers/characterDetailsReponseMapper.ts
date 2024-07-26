import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";
import { Comics } from "src/marvel/core/domain/entities/comics";
import { ApiCharacterDetails, ApiComics } from "src/marvel/infrastructure/api/clients/MarvelApiClient";

export const mapCharacterDetailsResponse = (
  apiCharacterDetails: ApiCharacterDetails,
  apiCharacterDetailsComics: ApiComics[],
): CharacterDetails => {
  const getComics = (): Comics[] =>
    apiCharacterDetailsComics.map(({ id, thumbnail, title, dates }) => ({
      id,
      title,
      imageUrl: `${thumbnail.path}/${REPLACE_SIZE_IMAGE}.${thumbnail.extension}`,
      dates,
    }));

  return {
    character: {
      id: apiCharacterDetails.id,
      name: apiCharacterDetails.name,
      imageUrl: `${apiCharacterDetails.thumbnail.path}/${REPLACE_SIZE_IMAGE}.${apiCharacterDetails.thumbnail.extension}`,
      description: apiCharacterDetails.description,
    },
    comics: getComics(),
  };
};
