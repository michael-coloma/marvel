import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MarvelApiClient } from "./MarvelApiClient";
import { generateMarvelApiUrl } from "../../utils/marvelApiUtils";

const responseMockApiCharacters = {
  code: 200,
  status: "Ok",
  data: {
    offset: 0,
    limit: 20,
    total: 1564,
    count: 20,
    results: [
      {
        id: 1011334,
        name: "3-D Man",
        description: "",
        modified: "2014-04-29T14:18:17-0400",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
        comics: {},
      },
    ],
  },
};

const responseMockApiCharacterDetails = {
  code: 200,
  status: "Ok",
  data: {
    offset: 0,
    limit: 1,
    total: 1,
    count: 1,
    results: [
      {
        id: 1011334,
        name: "3-D Man",
        description: "",
        modified: "2014-04-29T14:18:17-0400",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        comics: {
          available: 12,
          collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/comics",
          items: [
            {
              resourceURI: "http://gateway.marvel.com/v1/public/comics/21366",
              name: "Avengers: The Initiative (2007) #14",
            },
          ],
        },
      },
    ],
  },
};

const responseMockApiCharacterDetailsComics = {
  code: 200,
  status: "Ok",
  data: {
    offset: 0,
    limit: 20,
    total: 20,
    count: 20,
    results: [
      {
        id: 21366,
        title: "Avengers: The Initiative (2007) #14",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        dates: [
          {
            type: "onsaleDate",
            date: "2021-09-29T00:00:00-0400",
          },
        ],
      },
    ],
  },
};

describe("PodcastsApiClient", () => {
  let client: MarvelApiClient;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    client = new MarvelApiClient(true); // true to Avoid hash for test
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe("fetchTopCharacters test", () => {
    it("fetches top characteres successfully", async () => {
      const url = generateMarvelApiUrl({
        path: "characters",
        params: { limit: client.LIMIT_FETCH_CHARACTERS },
        isTest: true,
      });

      mockAxios.onGet(url).reply(200, responseMockApiCharacters);
      const responseExpected = await client.fetchTopCharacters();

      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(url);
      expect(responseExpected.length).toEqual(responseMockApiCharacters.data.results.length);
      expect(responseExpected[0]).toEqual(responseMockApiCharacters.data.results[0]);
    });

    it("should throw an error when fetching top characters fails", async () => {
      const url = generateMarvelApiUrl({
        path: "characters",
        params: { limit: client.LIMIT_FETCH_CHARACTERS },
        isTest: true,
      });
      mockAxios.onGet(url).reply(500, { error: "Internal Server Error" });
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => "error");
      await expect(client.fetchTopCharacters()).rejects.toThrowError("Request failed with status code 500");
      consoleErrorSpy.mockRestore();
    });
  });

  describe("fetchCharacterDetails test", () => {
    it("fetches character details successfully", async () => {
      const characterId = "1011334";
      const url = generateMarvelApiUrl({
        path: `characters/${characterId}`,
        params: { limit: client.LIMIT_FETCH_CHARACTER_DETAILS },
        isTest: true,
      });

      mockAxios.onGet(url).reply(200, responseMockApiCharacterDetails);
      const responseExpected = await client.fetchCharacterDetails(characterId);

      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(url);
      expect(responseExpected).toEqual(responseMockApiCharacterDetails.data.results[0]);
    });

    it("should throw an error when fetching character details fails", async () => {
      const characterId = "1011334";
      const url = generateMarvelApiUrl({
        path: `characters/${characterId}`,
        params: { limit: client.LIMIT_FETCH_CHARACTER_DETAILS },
        isTest: true,
      });
      mockAxios.onGet(url).reply(500, { error: "Internal Server Error" });
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => "error");
      await expect(client.fetchCharacterDetails(characterId)).rejects.toThrowError(
        "Request failed with status code 500",
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("fetchCharacterDetailsComics test", () => {
    it("fetches character details comics successfully", async () => {
      const urlComics = "characters/1011334/comics";
      const url = generateMarvelApiUrl({
        path: urlComics,
        params: { limit: client.LIMIT_FETCH_CHARACTERS_DETAILS_COMICS },
        isTest: true,
        withBaseURL: false,
      });

      mockAxios.onGet(url).reply(200, responseMockApiCharacterDetailsComics);
      const responseExpected = await client.fetchCharacterDetailsComics(urlComics);

      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(url);
      expect(responseExpected.length).toEqual(responseMockApiCharacterDetailsComics.data.results.length);
      expect(responseExpected[0]).toEqual(responseMockApiCharacterDetailsComics.data.results[0]);
    });

    it("should throw an error when fetching character details comics fails", async () => {
      const urlComics = "characters/1011334/comics";
      const url = generateMarvelApiUrl({
        path: urlComics,
        params: { limit: client.LIMIT_FETCH_CHARACTERS_DETAILS_COMICS },
        isTest: true,
        withBaseURL: false,
      });
      mockAxios.onGet(url).reply(500, { error: "Internal Server Error" });
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => "error");
      await expect(client.fetchCharacterDetailsComics(urlComics)).rejects.toThrowError(
        "Request failed with status code 500",
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
