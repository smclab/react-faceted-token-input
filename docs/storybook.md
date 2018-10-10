# Storybook

**NOTE**:
* you should have your developer enviroment ready before running storybook, see the [development](development.md) documentation.

The *react-faceted-token-input* component comes with a working example in the storybook that will run
by default in port 9001.

To start storybook, from the *react-faceted-token-input* folder run:

    npm run storybook

Now in your browser go to `http://localhost:9001/` to see the example running.

## Files

The example is composed by quite a few files inside of the `stories` folder:

* `index.html`: manage the standard html page where the app lives

* `index.js`: manage the story that contains the *react-faceted-token-input* component

* `types/index.js`: manage the available token types for the example

* `types/*-token-type.js`: defines the token types for the example

* `types/result-field-token-type.js`: manage the suggestions dropdown in the
  input
