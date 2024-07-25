import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { Character } from "src/marvel/core/domain/entities/character";
import { ApiResponseCharacters as ApiResponseCharacter, mapCharactersResponse } from "./characterResponseMapper";

const apiResponseCharacters: ApiResponseCharacter[] = [
  {
    id: 1234,
    name: "Spiderman",
    thumbnail: { path: "https://path", extension: "jpg" },
  },
];

const resultMap: Character[] = [
  {
    id: 1234,
    name: "Spiderman",
    imageUrl: `https://path/${REPLACE_SIZE_IMAGE}.jpg`,
  },
];

describe("charactersReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapCharactersResponse(apiResponseCharacters)).toEqual(resultMap);
  });

  it("checks reponse is mapped incorrectly", () => {
    expect(mapCharactersResponse(apiResponseCharacters)).not.toEqual([{ ...resultMap[0], title: "unexpectedTitle" }]);
  });
});
