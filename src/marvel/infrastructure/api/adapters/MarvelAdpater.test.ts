import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";
import { ApiCharacterDetails } from "../mappers/characterDetailsReponseMapper";
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

  it("fetches chracter details with adapter successfully", async () => {
    const CHARACTER_ID = 1234;
    const mockResponseApiClient: ApiCharacterDetails = {
      id: CHARACTER_ID,
      name: "Abomination (Ultimate)",
      description: "description about spiderman",
      thumbnail: { extension: "jpg", path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" },
      comics: {
        available: 2,
        collectionURI: "http://gateway.marvel.com/v1/public/characters/1016823/comics",
        items: [{ resourceURI: "http://gateway.marvel.com/v1/public/comics/40638", name: "Hulk (2008) #50" }],
      },
    };

    jest.spyOn(adapter["apiClient"], "fetchCharacterDetails").mockResolvedValue(mockResponseApiClient);

    const characterDetails: CharacterDetails = await adapter.fetchCharacterDetails(CHARACTER_ID.toString());

    expect(characterDetails).toMatchObject({
      character: {
        id: CHARACTER_ID,
        name: "Abomination (Ultimate)",
        description: "description about spiderman",
      },
      comics: [],
    });
  });
});
