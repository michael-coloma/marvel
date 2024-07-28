# Command Line Commands

## Initialization

```Shell
npm run preinstall:windows
```
Deletes node_modules and package-lock.json

```Shell
npm run preinstall:linux
```
Deletes node_modules and package-lock.json

```Shell
npm install
```
Installs libries and dependences used in this project


## Development

```Shell
npm run start
```

Starts the development server running on `http://localhost:3000`


## Server

### Development

```Shell
npm start
```

Starts the development server and makes your application accessible at
`localhost:3000`. Changes in the application code will be hot-reloaded.

### Production

```Shell
npm run start:production
```
- Builds your app (see `npm run build`)
- Starts the production server

The app is built for optimal performance: assets are
minified and served.

When terminal shows the message "Server is running on http://localhost:4000" then you can
open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Building

```Shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `dist` folder.

Upload the contents of `dist` to your web server to
see your work live!

See "webpack.config.js" for more information about configuration.

## Testing

## Unit testing

```Shell
npm runt test
```
Tests your application with the all test specified with `.tests.ts` or `.test.tsx` files
throughout the application.  


```Shell

npm run test:coverage
```

The same that `npm run test` but it shows coverage when test are finished.

## Linting

```Shell
npm run lint
```

Lints your code and tries to fix any errors it finds.

