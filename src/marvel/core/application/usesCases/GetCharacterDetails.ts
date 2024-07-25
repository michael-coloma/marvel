import { IMarvelApi } from "src/marvel/core/domain/ports/MarvelApiPort";

export class GetCharacterDetails {
  constructor(private marvelApi: IMarvelApi) {}

  async execute(characterId: string) {
    return await this.marvelApi.fetchCharacterDetails(characterId);
  }
}
