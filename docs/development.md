# Development

In this section we target the developers that want to help with resolving
issues, test, add features to the source code.

## Set Up

From the *react-faceted-token-input* folder run:

    npm install


### Dev Dependencies

You will have the following tools available:

`react`: you need react to develop a react component. You can find guides and
documentation on the [react website](https://facebook.github.io/react/)

`classnames`: let you conditionally combine classNames together

`babel`: you can (and should) use *ECMAScript 6* to write code for this
component and `babel` let you do exactly that. See [babeljs website](https://babeljs.io/)
for more information.

`eslint`: linting for your Javascript code

`react-dom` and `react-addons-test-utils`: utilities for testing react

`jest`: test framework for react. See the documentation about `Jest` [here](https://facebook.github.io/jest/)

`rimraf`: tool to remove file and folders, this is used in `npm clear`

`cross-env`: let you use `NODE_ENV` across all OS

`webpack`: used to run the server

`flow`: used to typecheck the source code, during development you can add types
to the variables. For more information about syntax and usage see the `flow`
documentation [here](https://flowtype.org/docs/getting-started.html)

### Available Commands

The *react-faceted-token-input* comes with some useful scripts to facilitate the
developer experience:

* [Build](#build)
* [Clean](#clean)
* [Flow](#flow)
* [Lint](#lint)
* [Test](#test)
* [Start](#start)

<a name="build"></a>
##### Build

Build the project with:

    npm run build

<a name="clean"></a>
##### Clean

Clean the lib folder to prepare for a rebuild:

    npm run clean

<a name="flow"></a>
##### Flow

Typecheck the Javascript code using the types declared during development:

    npm run flow

<a name="lint"></a>
##### Lint

Linting for your Javascript code, by default inside the `src` and `test` folders:

    npm run lint

<a name="test"></a>
##### Test

Run your test suite:

    npm test

For more information about existing tests and further testing head
[here](/test/README.md).

<a name="start"></a>
##### Start

Start the server with the example with:

    npm start

By default the server runs on port 3000,to change the default port go inside
`server.js` and on line 20 change the port number:

```javascript
  app.listen(3000, 'localhost', function(err) { ... }
```

For more information about the example go [here](example.md).

### Next

We prepared some [formatting guidelines](formatting.md) to
standardize the look of the code
