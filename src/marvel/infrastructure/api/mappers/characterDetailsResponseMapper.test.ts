import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";
import { ApiCharacterDetails, mapCharacterDetailsResponse } from "./characterDetailsReponseMapper";

const CHARACTER_ID = 1234;
const mockApiPodcastDetail: ApiCharacterDetails = {
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

const mockResultMap: CharacterDetails = {
  character: {
    id: CHARACTER_ID,
    name: "Abomination (Ultimate)",
    description: "description about spiderman",
    imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/REPLACE_SIZE_IMAGE.jpg",
  },
  comics: [],
};

describe("podcastsReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapCharacterDetailsResponse(mockApiPodcastDetail)).toEqual(mockResultMap);
  });
});
