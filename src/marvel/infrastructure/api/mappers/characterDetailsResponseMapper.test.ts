import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";
import { mapCharacterDetailsResponse } from "./characterDetailsReponseMapper";
import { ApiCharacterDetails, ApiComics } from "src/marvel/infrastructure/api/clients/MarvelApiClient";

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

export const responseMockApiComis: ApiComics[] = [
  {
    id: 1,
    title: "comic spiderman",
    thumbnail: { extension: "jpg", path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" },
    dates: [
      {
        type: "onsaleDate",
        date: "2022-07-20T00:00:00-0400",
      },
      {
        type: "focDate",
        date: "2022-06-20T00:00:00-0400",
      },
      {
        type: "unlimitedDate",
        date: "2022-10-24T00:00:00-0400",
      },
      {
        type: "digitalPurchaseDate",
        date: "2022-04-07T00:00:00-0400",
      },
    ],
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
      dates: [
        {
          type: "onsaleDate",
          date: "2022-07-20T00:00:00-0400",
          dateDate: new Date("2022-07-20T00:00:00-0400"),
        },
        {
          type: "focDate",
          date: "2022-06-20T00:00:00-0400",
          dateDate: new Date("2022-06-20T00:00:00-0400"),
        },
        {
          type: "unlimitedDate",
          date: "2022-10-24T00:00:00-0400",
          dateDate: new Date("2022-10-24T00:00:00-0400"),
        },
        {
          type: "digitalPurchaseDate",
          date: "2022-04-07T00:00:00-0400",
          dateDate: new Date("2022-04-07T00:00:00-0400"),
        },
      ],
    },
  ],
};

describe("podcastsReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapCharacterDetailsResponse(responseMockApiPodcastDetail, responseMockApiComis)).toEqual(mockResultMap);
  });
});
