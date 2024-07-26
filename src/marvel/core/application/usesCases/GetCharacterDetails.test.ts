import { MarvelAdapter } from "src/marvel/infrastructure/api/adapters/MarvelAdapter";
import { GetCharacterDetails } from "./GetCharacterDetails";
import { IMarvelApi } from "../../domain/ports/MarvelApiPort";

describe("GetCharacterDetails", () => {
  let marvelApiMock: Partial<IMarvelApi>;
  let getCharacterDetails: GetCharacterDetails;

  beforeEach(() => {
    marvelApiMock = {
      fetchCharacterDetails: jest.fn(),
    };

    getCharacterDetails = new GetCharacterDetails(marvelApiMock as unknown as MarvelAdapter);
  });

  it("should fetch character details and sort comics by onsale date", async () => {
    const characterId = "1234";
    const unsortedComics = [
      { id: "2", dates: [{ type: "onsaleDate", date: "2024-01-01" }] },
      { id: "1", dates: [{ type: "onsaleDate", date: "2023-01-01" }] },
    ];
    const characterDetailsData = {
      character: { id: "1234", name: "Spiderman" },
      comics: unsortedComics,
    };

    (marvelApiMock.fetchCharacterDetails as jest.Mock).mockResolvedValue(characterDetailsData);

    const result = await getCharacterDetails.execute(characterId);

    expect(marvelApiMock.fetchCharacterDetails).toHaveBeenCalledWith(characterId);
    expect(result.character).toEqual(characterDetailsData.character);
    expect(result.comics).toEqual([
      { id: "1", dates: [{ type: "onsaleDate", date: "2023-01-01" }] },
      { id: "2", dates: [{ type: "onsaleDate", date: "2024-01-01" }] },
    ]);
  });
});
