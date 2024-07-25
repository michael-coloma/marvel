import { IMarvelApi } from "src/marvel/core/domain/ports/MarvelApiPort";

export class GetTopCharacters {
  constructor(private marvelApi: IMarvelApi) {}

  async execute() {
    return await this.marvelApi.fetchTopCharacters();
  }
}
