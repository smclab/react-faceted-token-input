# Usage

You can use *react-faceted-token-input* to implement a tokenized input with
faceted behavior.

## Basic usage (ERRATO)

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
      return TokenTypes.getTokenType(token.type).renderToken(token);
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

<a name="renderToken"></a>
### renderToken (Required)

A function that given a token extract the data to render a token.

It should get:

`token`: an object containing the data that you need, an example token could be:

```javascript
  {
    'field': 'Author',
    'name': 'Albert',
    'dropdownOptions': {
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
      }
    }
  }
```
It should return an object. For example:

```javascript
  renderToken(token) {
    return {
      facet: token.field,
      description: token.name,
      dropdownMenu: token.dropdownOptions
    };
  }
```

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

An array that contains the possible dropdowns. It should start as an empty array inside the state in your constructor.

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

A function that dictate the behaviour of the input when you change the value, displaying for example suggestions in the dropdown.

It should get:

`tokens`: the possible tokens that can be displayed

`searchText`: the input value

For example:

```javascript
  onChange({ tokens, searchText }) {
    const requestId = Date.now();

    this.requestId = requestId;

    TokenTypes.getTokenSuggestions(searchText).then(dropdownSections => {
      if (this.requestId === requestId) {
        this.setState({ dropdownSections });
      }
    });
  }
```

`getTokenSuggestion`: is an optional function that search for the appropriate 
suggestions

## Demo

Head [here](example) to see a working example.
