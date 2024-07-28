# Marvel Application Test

Mini web application with TypeScript, ReactJS, React Query for cache management, and responsive design.
## Features
<dl>
  <dt>Listing top 50 characters from marvel API</dt>
  <dd>It displays the 50 first character with a filter by name</dd>

  <dt>Displaying characters details</dt>
  <dd>It shows information about the character selected with 20 commics</dd>
</dl>



## Quick start

1.  Make sure that you have Node.js v20.12.1 and npm v10 or above installed.
2.  Clone this repo using `git clone https://github.com/michael-coloma/marvel.git`
3.  Move to the appropriate directory: `cd marvel`.<br />
4.  (optional) Run `npm preinstall:windows`  to delete previous installation.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
4.  Run `npm install` in order to install dependencies.<br />    
5.  Run `npm start` to lauch the application.

Now you're ready to rumble!


## Documentation
- [Your app](docs/app.md): Technologies and Architecture used
- [**Commands**](docs/commands.md): Commands for podcasts web application
- [Styling](docs/css.md): How to work with the CSS
- [Testing](docs/testing.md): How to work with your test.


## Note
- To avoid re-renders in development mode, you can comment out `React.StrictMode` in `index.tsx`. Although it is normal to wrap the app with `React.StrictMode` in development mode, this will result in one additional re-render.

- There is a tool in React Query to check the cache in `index.tsx`. It has been commented out, but it can be used to view the cache.

- According to the [API documentation](https://developer.marvel.com/docs#!/public/getComicsCharacterCollection_get_2) (Swagger Marvel), the comics can be ordered by the following fields: `focDate`, `onsaleDate`, `title`, `issueNumber`, and `modified`.

  I preferred not to use this parameter in the request because I want to choose between `focDate`, `onsaleDate`, `unlimitedDate`, and `digitalPurchaseDate`. The client might need this capability in the future.

  The code can receive more parameters, such as `orderBy`, if necessary. See `"src\marvel\infrastructure\api\clients\MarvelApiClient.ts"`.


## Author

Michael Coloma calva

