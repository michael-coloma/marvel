# Technologies and Architecture used

## State management

This app manages the application state using the Context API to retrieve data for favorite characters. 
I use two contexts wrapped in the application called "FavoriteCharacters" and "ShowFavorites". The first one saves the favorite character IDs, and the second one shows the favorite characters.

The data are saved in the browser's local storage.


## Routing

For routing, we use [`react-router-dom`] to manage ours rutes:
- "/" to characters list
- "/character/:characterId" to character details

## @tanStack/react-query and tanstack/react-query-persist-client

React Query is used to avoid making unnecessary requests to the Marvel API and to keep the API data available for a maximum of 24 hours.

- To do request via useQuery 
- To manage the cache and enable persistence with localstorage.

## Jest for the test

- see [Testing](docs/testing.md)

## Prettier and esLint using with visual studio code (VSC)

To manage the dependency rules for 'react' and 'typescript' as well as the code formatting

My configuration for VSC is the following (ctrl + shi + p: Perference open user settings):

```
{
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "git.confirmSync": false,
  "editor.renderWhitespace": "all",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.workingDirectories": ["src"]
}
```
The prettier rules is in the file configuration `.pretterrc`.
the esLint rules is in the file configuration `.eslintrc.yaml`

## Webpack

For the management and optimization of resources depending on the development environment (prod or dev)

You can see the file configuration to know more `wepack.config.js`

## Architecture: `hexagonal` and `vertical slicing`

According to the `hexagonal` architecture, I use "infrastructure," "application," and "domain" (with both application and domain inside the "core" folder):

- **Infrastructure**: It handles logic related to external data. In this case, our client uses an adapter for each request to our endpoints, similar to "https://gateway.marvel.com/v1/public/characters/1009148?ts=1722167490627&apikey=41ad494c5e5cf7ba5b63996e3d156e75&hash=b514f36ad680c2ce55c9410eba380e5b&limit=1"

- **Application**: It manages our use cases (GetTopCharacters and GetCharacterDetails).

- **Domain**: It manages our entities and our interfaces to the apiClient (ports).

Additionally, I have decided to structure the React ecosystem within the "adapters" folder, understanding it as the logic or lifecycle that exists between the components and the graphical interface that the user can see:

- **"adapters/primary"** for the graphical interface.
- **"adapters/secondary"** to manage React's own mechanisms such as global state, contexts, etc.

The use cases will be called via a hook on the page where the data infrastructure is needed (characters and characterDetails inside the folder pages).

According to `vertical slicing`, I am using the directory `marvel` with the idea of using the same infrastructure if, in the future, I need to add users, for example. I can create a directory called "developers" with similar infrastructure.


```
+---marvel
    +---adapters
    ª   +---primary
    ª   ª   +---types
    ª   ª   ª       constants.ts
    ª   ª   ª       enums.ts
    ª   ª   ª       
    ª   ª   +---ui
    ª   ª       +---assets
    ª   ª       ª       IconBigHearthLike.svg
    ª   ª       ª       IconBigHearthNotLike.svg
    ª   ª       ª       IconHearthLikes.svg
    ª   ª       ª       IconHearthNotLikes.svg
    ª   ª       ª       IconHearthWhite.svg
    ª   ª       ª       IconSearch.svg
    ª   ª       ª       LogoMarvel.svg
    ª   ª       ª       
    ª   ª       +---components
    ª   ª       ª       CharacterCard.module.css
    ª   ª       ª       CharacterCard.test.tsx
    ª   ª       ª       CharacterCard.tsx
    ª   ª       ª       ComicCard.module.css
    ª   ª       ª       ComicCard.test.tsx
    ª   ª       ª       ComicCard.tsx
    ª   ª       ª       ComicsList.module.css
    ª   ª       ª       ComicsList.tsx
    ª   ª       ª       Filter.module.css
    ª   ª       ª       Filter.test.tsx
    ª   ª       ª       Filter.tsx
    ª   ª       ª       Header.module.css
    ª   ª       ª       Header.test.tsx
    ª   ª       ª       Header.tsx
    ª   ª       ª       Loader.module.css
    ª   ª       ª       Loader.test.tsx
    ª   ª       ª       Loader.tsx
    ª   ª       ª       
    ª   ª       +---hooks
    ª   ª       ª       useGetCharacterDetails.ts
    ª   ª       ª       useGetTopCharacters.ts
    ª   ª       ª       useGetUrlImage.ts
    ª   ª       ª       
    ª   ª       +---pages
    ª   ª       ª       CharacterDetails.module.css
    ª   ª       ª       CharacterDetails.tsx
    ª   ª       ª       Characters.module.css
    ª   ª       ª       Characters.tsx
    ª   ª       ª       
    ª   ª       +---utils
    ª   +---secondary
    ª       +---context
    ª       ª       FavoriteCharactersContext.ts
    ª       ª       ShowFavoritesCharacterContext.ts
    ª       ª       
    ª       +---providers
    ª               FavoriteCharactersProvider.tsx
    ª               ShowFavoritesCharactersProvider.tsx
    ª               
    +---config
    ª   +---routes
    ª           routes.ts
    ª           
    +---core
    ª   +---application
    ª   ª   +---usesCases
    ª   ª           GetCharacterDetails.test.ts
    ª   ª           GetCharacterDetails.ts
    ª   ª           GetTopCharacters.ts
    ª   ª           
    ª   +---domain
    ª       +---entities
    ª       ª       character.ts
    ª       ª       characterDetails.ts
    ª       ª       comics.ts
    ª       ª       
    ª       +---ports
    ª               MarvelApiPort.ts
    ª               
    +---infrastructure
        +---api
        ª   +---adapters
        ª   ª       MarvelAdapter.ts
        ª   ª       MarvelAdpater.test.ts
        ª   ª       
        ª   +---clients
        ª   ª       MarvelApiClient.test.ts
        ª   ª       MarvelApiClient.ts
        ª   ª       
        ª   +---mappers
        ª           characterDetailsReponseMapper.ts
        ª           characterDetailsResponseMapper.test.ts
        ª           characterResponseMapper.test.ts
        ª           characterResponseMapper.ts
        ª           
        +---utils
                marveApiUtils.test.ts
                marvelApiUtils.ts
```