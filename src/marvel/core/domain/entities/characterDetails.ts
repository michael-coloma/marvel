import { Comics } from "./comics";
import { Character } from "./character";

export type CharacterWithDescription = Character & { description: string };

export interface CharacterDetails {
  character: CharacterWithDescription;
  comics: Comics[];
}
