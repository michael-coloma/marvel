import { Character } from "../../../core/domain/entities/character";
import { CharacterDetails } from "../../../core/domain/entities/characterDetails";
import { IMarvelApi } from "../../../core/domain/ports/MarvelApiPort";
import { MarvelApiClient } from "../clients/MarvelApiClient";
import { mapCharactersResponse } from "../mappers/characterResponseMapper";
import { mapCharacterDetailsResponse } from "src/marvel/infrastructure/api/mappers/characterDetailsReponseMapper";

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

  async fetchCharacterDetails(characterId: string): Promise<CharacterDetails> {
    const responseApiCharacterDetails = await this.apiClient.fetchCharacterDetails(characterId);
    const resposeApiComics = await this.apiClient.fetchCharacterDetailsComics(
      responseApiCharacterDetails.comics.collectionURI,
    );

    return mapCharacterDetailsResponse(responseApiCharacterDetails, resposeApiComics);
  }
}
