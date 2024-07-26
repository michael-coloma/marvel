import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MarvelApiClient } from "./MarvelApiClient";
import { generateMarvelApiUrl } from "../../utils/marvelApiUtils";

const mockCharactersResponseApi = {
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
      const responseExpected = await client.fetchTopCharacters();

      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(url);
      expect(responseExpected.length).toEqual(mockCharactersResponseApi.data.results.length);
      expect(responseExpected[0]).toEqual(mockCharactersResponseApi.data.results[0]);
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
});
