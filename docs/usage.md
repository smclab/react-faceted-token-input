# Usage

You can use *react-faceted-token-input* to implement a tokenized input with
faceted behavior inside your React app.

## Demo

Head [here](example) to see a working example.

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

## Props

* [renderToken](#renderToken)
* [defaultTokens](#defaultToken)
* [placeholder](#placeholder)
* [dropdownSections](#dropdownSections)
* [onChange](#onChange)
* [children](#children)

<a name="renderToken"></a>
### renderToken (Required)

A function that given a token extract the data to render a token.

It should get:

`token`: an object containing the data that you need. The type of token is
entirely up to you. An example token could be:

```javascript
  {
    'field': 'Author',
    'name': 'Albert',
    'dropdownOptions': [
      {
        label: 'Author',
        current: (token.field === field), // true or false
        result: {
          ...token,
          field
        }
      },

      {
        label: 'Mentioned',
        current: (token.field === field), // true or false
        result: {
          ...token,
          field
        }
      },

      {
        label: 'Modified by...',
        current: (token.field === field), // true or false
        result: {
          ...token,
          field
        }
      }
    ]
  }
```

**Note:**
* The `dropdownOptions` field should be an array of objects that represent the
other possible `field` for the token. Every object should have:

  `label`: the new name of the `field`

  `current`: defines if this is the currently selected field

  `result`: the resulting token with the corrected field

It should return an object that should have the following fields:

`facet`: The currently selected type of token (for example Author).

`description`: The token description (for example a name).

`dropdownMenu`: The other possible options (if available) for the facet,
  defined inside the `dropdownOptions` field of the token object.

The renedered token structure is:

![Token structure](./img/tokens-structure.png)

For example:

```javascript
  renderToken(token) {
    return {
      facet: token.field,
      description: token.name,
      dropdownMenu: token.dropdownOptions
    };
  }
```

And the rendered result from the example:

![Rendered token example](./img/rendered-token-example.png)

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
  placeholder = 'Search...';
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
