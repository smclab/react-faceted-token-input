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

```javascript
  renderToken(token) {
    facet: token.field,
    description: token.name,
    dropdownMenu: Object.keys(FIELDS).map(field => ({
      label: FIELDS[field],
      current: (token.field === field),
      result: {
        ...token,
        field
      }
    }))
  }
```



<a name="defaultToken"></a>
### defaultTokens



<a name="placeholder"></a>
### placeholder


<a name="dropdownSections"></a>
### dropdownSections


<a name="onChange"></a>
### onChange



## Working Example

Head [here](example) to see a working example.
