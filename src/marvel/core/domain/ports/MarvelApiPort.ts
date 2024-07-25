import { Character } from "../entities/character";
import { CharacterDetails } from "../entities/characterDetails";

export interface IMarvelApi {
  fetchTopCharacters(): Promise<Character[]>;
  fetchCharacterDetails(characterId: string): Promise<CharacterDetails>;
}
