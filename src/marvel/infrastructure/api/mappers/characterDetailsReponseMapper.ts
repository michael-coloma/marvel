import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";

export interface ApiComics {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string; // http://gateway.marvel.com/v1/public/comics/21366
    name: string; // Avengers: The Initiative (2007) #14
  }[];
}
export interface ApiCharacterDetails {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  comics: ApiComics;
}
export const mapCharacterDetailsResponse = (apiCharacterDetails: ApiCharacterDetails): CharacterDetails => {
  return {
    character: {
      id: apiCharacterDetails.id,
      name: apiCharacterDetails.name,
      imageUrl: `${apiCharacterDetails.thumbnail.path}/${REPLACE_SIZE_IMAGE}.${apiCharacterDetails.thumbnail.extension}`,
      description: apiCharacterDetails.description,
    },
    comics: [],
  };
};
