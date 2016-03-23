import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FacetedTokenInput from 'react-faceted-token-input';
import classNames from 'classnames';

import * as TokenTypes from './types';

const customElements = {
  'check': <span className="check">✓</span>,
  'dropdownArrow': ' ▾'
}

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
        customElements={ customElements }
        renderToken={ this.renderToken }
        dropdownSections={ this.state.dropdownSections }
        placeholder="Type one of: A B D G J K R S T"
        defaultTokens={ [] }
        onChange={ event => this.onChange(event) }
      />
    );
  }

}

ReactDOM.render((
  <div className="facetedTokenInput">
    <App />
  </div>
), document.getElementById('runningDemo'));
