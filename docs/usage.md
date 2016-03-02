# Usage

You can use *react-faceted-token-input* to implement a tokenized input with
faceted behavior inside your React app.

## Demo

Head [here](example.md) to see a working example.

## Basic usage

```javascript
  import FacetedTokenInput from '../src/FacetedTokenInput';

  class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        dropdownSections: []
      };
    }

    renderToken(token) {
      return {
        facet: token.field,
        description: token.name,
        dropdownMenu: token.dropdownOptions
      };
    }

    onChange({ tokens, searchText }) {
      const requestId = Date.now();

      this.requestId = requestId;

      TokenTypes.getTokenSuggestions(searchText).then(dropdownSections => {
        if (this.requestId === requestId) {
          this.setState({ dropdownSections });
        }
      });
    }

    render() {
      return (
        <FacetedTokenInput
          renderToken={ this.renderToken }
          dropdownSections={ this.state.dropdownSections }
          placeholder="Search…"
          defaultTokens={ [] }
          onChange={ event => this.onChange(event) }
        />
      );
    }
  }
```

## Token

A `token` can be anything you need to be displayed, a single string, an object
or anything else.
It's a generic type that you define based on the implementation
of this component in your React app.

## Props

* [renderToken](#renderToken)
* [defaultTokens](#defaultToken)
* [placeholder](#placeholder)
* [dropdownSections](#dropdownSections)
* [onChange](#onChange)
* [children](#children)

<a name="renderToken"></a>
### renderToken(token) (Required)

A function that given a `token` returns a rendered token to use in the main
component.

```javascript
  renderToken(token) {
    return {
      facet: string?,
      description: string?,
      dropdownMenu: [
        {
          label: string?,
          current: boolean?,
          result: token
        },

        {
          label: string?,
          current: boolean?,
          result: token
        }
      ]
    };
  }
```

Here is a scheme of the `RenderedToken` properties, based on the example
included in the repository:

![Token elements scheme](./images/rendered-token-scheme.png)

* `facet`: a string that should represent the *kind* of the token. You can omit
  it entirely.
* `description`: a string that should represent the *content* or *value* of the
  token.
* `dropdownMenu`: The other possible options (if available) for this token,
  defined as an array of objects. Each object contains:
  * `label`: a string that will be the label for this option,
  * `current`: a boolean that defines if this is the currently selected option
    so a small tick can be presented on the left side,
  * `result`: the new token that will overwrite the current one if this specific
    option is chosen by the user.

<a name="defaultToken"></a>
### defaultTokens

An array that contains the default displayed tokens.

```javascript
  defaultTokens = [];
```

<a name="placeholder"></a>
### placeholder

A string that will be displayed as a placeholder in the empty input.

```javascript
  placeholder = string?;
```

<a name="dropdownSections"></a>
### dropdownSections

An array that contains the possible dropdown options for auto completion.
It should start as an empty array inside the state in your constructor.

For example:

```javascript
  constructor(props) {
    super(props);

    this.state = {
      dropdownSections: []
    };
  }
```

<a name="onChange"></a>
### onChange

A function that dictate the behaviour of the input when you change the value,
displaying for example suggestions in the dropdown.

It could get:

`tokens`: the possible tokens that can be displayed

`searchText`: the input value to search in the suggestions

For example:

```javascript
  onChange({ tokens, searchText }) {
    // you can implement any method to get suggestions and
    // display the dropdown

    // from the example in this repository example
    const requestId = Date.now();

    this.requestId = requestId;

    TokenTypes.getTokenSuggestions(searchText).then(dropdownSections => {
      if (this.requestId === requestId) {
        this.setState({ dropdownSections });
      }
    });
  }
```

<a name="onChange"></a>
### children

Optional childs of the component. This should be a react element that will be
placed after the input and before the dropdown selection.
