import { Character } from "../../../core/domain/entities/character";
import { CharacterDetails } from "../../../core/domain/entities/characterDetails";
import { IMarvelApi } from "../../../core/domain/ports/MarvelApiPort";
import { MarvelApiClient } from "../clients/MarvelApiClient";
import { mapCharacterDetailsResponse } from "../mappers/characterDetailsReponseMapper";

import { mapCharactersResponse } from "../mappers/characterResponseMapper";

export class MarvelAdapter implements IMarvelApi {
  private apiClient = new MarvelApiClient();

  async fetchTopCharacters(): Promise<Character[]> {
    try {
      const response = await this.apiClient.fetchTopCharacters();

      return mapCharactersResponse(response);
    } catch (error) {
      console.error("Error");
      return [];
    }
  }
}
