import { generateMarvelApiUrl } from "./marvelApiUtils";

describe("marvelApiUtils Test", () => {
  it("generateMarvelApiUrl", () => {
    expect(generateMarvelApiUrl("characters", true)).toEqual(
      "https://gateway.marvel.com/v1/public/characters?ts=1234&apikey=41ad494c5e5cf7ba5b63996e3d156e75&hash=hash_test&limit=50",
    );
  });
});
