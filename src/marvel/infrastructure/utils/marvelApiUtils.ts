import md5 from "crypto-js/md5";

const PUBLIC_KEY = "41ad494c5e5cf7ba5b63996e3d156e75";
const PRIVATE_KEY = "35515ef26226e0e10d7520f93e363de5ec5ae0e6";
const API_BASE_URL = "https://gateway.marvel.com/v1/public";

export const TIME_STAMP_TEST_URL = 1234;
export const HAST_TEST_URL = "hash_test";

export const generateMarvelApiUrl = ({
  path,
  params,
  isTest = false,
  withBaseURL = true,
}: {
  path: string;
  params: { limit: string; [key: string]: string | number };
  isTest: boolean;
  withBaseURL?: boolean;
}): string => {
  let ts = Date.now();
  let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  if (isTest) {
    ts = TIME_STAMP_TEST_URL;
    hash = HAST_TEST_URL;
  }

  const paramsRequest = new URLSearchParams({
    ts: ts.toString(),
    apikey: PUBLIC_KEY,
    hash: hash,
    ...params,
  });

  return withBaseURL ? `${API_BASE_URL}/${path}?${paramsRequest}` : `${path}?${paramsRequest}`;
};
