import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";
import { mapCharacterDetailsResponse } from "./characterDetailsReponseMapper";
import { ApiCharacterDetails, ApiComics } from "src/marvel/infrastructure/api/clients/MarvelApiClient";
import { DATE_TYPE_COMIC, DatesComics } from "src/marvel/core/domain/entities/comics";

const CHARACTER_ID = 1234;
const responseMockApiPodcastDetail: ApiCharacterDetails = {
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

const dateComics: DatesComics[] = [
  {
    type: DATE_TYPE_COMIC.ONSALE_DATE,
    date: "2022-07-20T00:00:00-0400",
  },
  {
    type: DATE_TYPE_COMIC.FOC_DATE,
    date: "2022-06-20T00:00:00-0400",
  },
  {
    type: DATE_TYPE_COMIC.UNLIMITED_DATE,
    date: "2022-10-24T00:00:00-0400",
  },
  {
    type: DATE_TYPE_COMIC.DIGITAL_PURCHASE_DATE,
    date: "2022-04-07T00:00:00-0400",
  },
];

export const responseMockApiComis: ApiComics[] = [
  {
    id: 1,
    title: "comic spiderman",
    thumbnail: { extension: "jpg", path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" },
    dates: dateComics,
  },
];

const mockResultMap: CharacterDetails = {
  character: {
    id: CHARACTER_ID,
    name: "Abomination (Ultimate)",
    description: "description about spiderman",
    imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/REPLACE_SIZE_IMAGE.jpg",
  },
  comics: [
    {
      id: 1,
      title: "comic spiderman",
      imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/REPLACE_SIZE_IMAGE.jpg",
      dates: dateComics,
    },
  ],
};

describe("podcastsReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapCharacterDetailsResponse(responseMockApiPodcastDetail, responseMockApiComis)).toEqual(mockResultMap);
  });
});
