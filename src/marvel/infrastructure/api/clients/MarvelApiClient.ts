import axios from "axios";

import { ApiResponseCharacters } from "src/marvel/infrastructure/api/mappers/characterResponseMapper";
import { generateMarvelApiUrl } from "../../utils/marvelApiUtils";
import { DatesComics } from "src/marvel/core/domain/entities/comics";

export interface ApiCharacterDetailsComics {
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
  comics: ApiCharacterDetailsComics;
}

export interface ApiComics {
  id: number;
  title: string;
  thumbnail: { path: string; extension: string };
  dates: DatesComics[];
}

export class MarvelApiClient {
  public LIMIT_FETCH_CHARACTERS = "50";
  public LIMIT_FETCH_CHARACTER_DETAILS = "1";
  public LIMIT_FETCH_CHARACTERS_DETAILS_COMICS = "20";
  private isTest: boolean;

  constructor(isTest: boolean = false) {
    this.isTest = isTest;
  }
  async fetchTopCharacters(): Promise<ApiResponseCharacters[]> {
    const url = generateMarvelApiUrl({
      path: "characters",
      params: { limit: this.LIMIT_FETCH_CHARACTERS },
      isTest: this.isTest,
    });

    const response = await axios.get(url).catch((error) => {
      console.error("There is an error with fetchTopCharacters in MarvelApiClient", error);
      throw error;
    });

    return response.data.data.results;
  }

  async fetchCharacterDetails(characterId: string): Promise<ApiCharacterDetails> {
    const url = generateMarvelApiUrl({
      path: `characters/${characterId}`,
      params: { limit: this.LIMIT_FETCH_CHARACTER_DETAILS },
      isTest: this.isTest,
    });

    const response = await axios.get(url).catch((error) => {
      console.error("There is an error with fetchCharacterDetails in MarvelApiClient", error);
      throw error;
    });

    return response.data.data.results?.[0];
  }

  async fetchCharacterDetailsComics(urlComics: string): Promise<ApiComics[]> {
    const url = generateMarvelApiUrl({
      path: urlComics,
      params: { limit: this.LIMIT_FETCH_CHARACTERS_DETAILS_COMICS },
      isTest: this.isTest,
      withBaseURL: false,
    });

    const response = await axios.get(url).catch((error) => {
      console.error("There is an error with fetchCharacterDetailsComics in MarvelApiClient", error);
      throw error;
    });

    return response.data.data.results;
  }
}
