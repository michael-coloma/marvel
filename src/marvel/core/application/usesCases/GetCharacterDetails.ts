import { IMarvelApi } from "src/marvel/core/domain/ports/MarvelApiPort";
import { Comics, DATE_TYPE_COMIC } from "src/marvel/core/domain/entities/comics";
import { CharacterDetails } from "src/marvel/core/domain/entities/characterDetails";

export class GetCharacterDetails {
  constructor(private marvelApi: IMarvelApi) {}

  public sortComicsByOnSaleDate = (comics: Comics[]): Comics[] => {
    return comics.sort((a, b) => {
      const dateA = new Date(a.dates.find((date) => date.type === DATE_TYPE_COMIC.ONSALE_DATE)?.date || "");
      const dateB = new Date(b.dates.find((date) => date.type === DATE_TYPE_COMIC.ONSALE_DATE)?.date || "");
      return dateA.getTime() - dateB.getTime();
    });
  };

  async execute(characterId: string) {
    const characterDetailsData = await this.marvelApi.fetchCharacterDetails(characterId);
    const comicSorted = this.sortComicsByOnSaleDate(characterDetailsData.comics);

    return { character: characterDetailsData.character, comics: comicSorted } as CharacterDetails;
  }
}
