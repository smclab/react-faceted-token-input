# Development

In this section we target the developers that want to help with resolving
issues, test, add features to the source code.

## Set Up

From the *react-faceted-token-input* folder run:

    npm i


### Dev Dependencies

You will have the following tools available:

`react`: you need react to develop a react component

`babel`: you can (and should) use *ECMAScript 6* to write code for this
component and `babel` let you do exactly that

`eslint`: linting for your Javascript code

`react-dom` and `react-addons-test-utils`: utilities for testing react

`jest`: test framework for react

`rimraf`: tool to remove file and folders used in `npm clear`

`cross-env`: let you use `NODE_ENV` across all OS

`webpack`: used to run the server.

### Available Commands

The *react-faceted-token-input* comes with some useful scripts to facilitate the
developer experience:

##### Build

Build the project with:

    npm build

##### Clean

Clean the lib folder to prepare for a rebuild:

    npm clean

##### Lint

Linting for your Javascript code, by default inside the `src` and `test` folders:

    npm lint

##### Test

Run your test suite:

    npm test

For more information about existing tests and further testing head
[here](/test/README.md).

##### Start

Start the server with the example with:

  npm start

By default the server runs on port 3000,to change the default port go inside
`server.js` and on line 20 change the port number:

```javascript
    app.listen(3000, 'localhost', function(err) { ... }
```

For more information about the example go [here](example.md).

##### Next

We prepared some [formatting guidelines](formatting.md) to standardize the code 
