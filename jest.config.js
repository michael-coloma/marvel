module.exports = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // include
    "!src/**/*.d.ts", // exclude
    "!src/setupTests.ts", // exclude
    "!src/reportWebVitals.ts", // exclude
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of directory names to be searched recursively up from the requiring module's location
  // @see https://stackoverflow.com/a/51174924/1614677
  moduleDirectories: ["node_modules", "<rootDir>"],
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // @see https://stackoverflow.com/questions/39418555/
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.tsx",
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // explicit problem with
  // - node_modules/uuid/dist/esm-browser/index.js
  transformIgnorePatterns: ["node_modules/(?!(uuid))"],
};
