import md5 from "crypto-js/md5";
import { LIMIT_FETCH_CHARACTERS } from "src/marvel/adapters/primary/types/constants";

const PUBLIC_KEY = "41ad494c5e5cf7ba5b63996e3d156e75";
const PRIVATE_KEY = "35515ef26226e0e10d7520f93e363de5ec5ae0e6";
const API_BASE_URL = "https://gateway.marvel.com/v1/public";

export const generateMarvelApiUrl = (path: string, isTest = false): string => {
  let ts = Date.now();
  let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  if (isTest) {
    ts = 1234;
    hash = "hash_test";
  }

  const params = new URLSearchParams({
    ts: ts.toString(),
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: LIMIT_FETCH_CHARACTERS.toString(),
  });

  return `${API_BASE_URL}/${path}?${params}`;
};
