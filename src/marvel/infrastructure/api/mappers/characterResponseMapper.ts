import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { Character } from "src/marvel/core/domain/entities/character";

export interface ApiResponseCharacters {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

export const mapCharactersResponse = (apiCharacters: ApiResponseCharacters[]): Character[] => {
  const result: Character[] = apiCharacters.map((apiCharacter) => ({
    id: apiCharacter.id,
    name: apiCharacter.name,
    // https://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04/portrait_xlarge.jpg
    imageUrl: `${apiCharacter.thumbnail.path}/${REPLACE_SIZE_IMAGE}.${apiCharacter.thumbnail.extension}`,
  }));

  return result;
};
