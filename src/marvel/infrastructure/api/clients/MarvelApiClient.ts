import axios from "axios";

import { ApiResponseCharacters } from "src/marvel/infrastructure/api/mappers/characterResponseMapper";
import { ApiCharacterDetails } from "src/marvel/infrastructure/api/mappers/characterDetailsReponseMapper";
import { generateMarvelApiUrl } from "../../utils/marvelApiUtils";

export class MarvelApiClient {
  private isTest: boolean;
  constructor(isTest: boolean = false) {
    this.isTest = isTest;
  }
  async fetchTopCharacters(): Promise<ApiResponseCharacters[]> {
    const url = generateMarvelApiUrl("characters", this.isTest);

    const response = await axios.get(url).catch((error) => {
      console.error("There is an error with fetchTopCharacters in MarvelApiClient", error);
      throw error;
    });

    return response.data.data.results;
  }

  async fetchCharacterDetails(characterId: string): Promise<ApiCharacterDetails> {
    const url = generateMarvelApiUrl(`characters/${characterId}`, this.isTest);
    const response = await axios.get(url).catch((error) => {
      console.error("There is an error with fetchCharacterDetails in MarvelApiClient", error);
      throw error;
    });

    return response.data.data.results?.[0];
  }
}
