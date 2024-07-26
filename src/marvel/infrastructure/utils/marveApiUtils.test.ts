import { generateMarvelApiUrl, HAST_TEST_URL, TIME_STAMP_TEST_URL } from "./marvelApiUtils";

describe("marvelApiUtils Test", () => {
  it("generateMarvelApiUrl with baseURL", () => {
    expect(
      generateMarvelApiUrl({ path: "characters", params: { limit: "1" }, isTest: true, withBaseURL: true }),
    ).toEqual(
      "https://gateway.marvel.com/v1/public/characters?ts=1234&apikey=41ad494c5e5cf7ba5b63996e3d156e75&hash=hash_test&limit=1",
    );
  });

  it("generateMarvelApiUrl without baseURL", () => {
    expect(
      generateMarvelApiUrl({ path: "characters", params: { limit: "1" }, isTest: true, withBaseURL: false }),
    ).toEqual(
      `characters?ts=${TIME_STAMP_TEST_URL}&apikey=41ad494c5e5cf7ba5b63996e3d156e75&hash=${HAST_TEST_URL}&limit=1`,
    );
  });
});
