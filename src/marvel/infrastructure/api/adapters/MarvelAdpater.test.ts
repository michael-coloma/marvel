import { MarvelAdapter } from "./MarvelAdapter";

describe("CharacterAdapter", () => {
  let adapter: MarvelAdapter;

  beforeEach(() => {
    adapter = new MarvelAdapter();
  });

  it("fetches top podcasts with adapter successfully", async () => {
    const mockDataResponseApiClient = [
      {
        id: 1234,
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
    ];

    jest.spyOn(adapter["apiClient"], "fetchTopCharacters").mockResolvedValue(mockDataResponseApiClient);

    const podcasts = await adapter.fetchTopCharacters();

    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].id).toBe(1234);
    expect(podcasts[0].name).toBe("3-D Man");
  });
});
