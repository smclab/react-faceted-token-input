
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import * as TokenTypes from './types';

import CompoundInput from '../src/CompoundInput';

const NUMERIC_COMPARATORS = {
  'eq': 'Equals to…',
  'gt': 'Greater then…',
  'lt': 'Less then…'
};

const CHECK = <span className="check">✓</span>;

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
      <CompoundInput
        renderToken={ this.renderToken }
        dropdownSections={ this.state.dropdownSections }
        placeholder="Search…"
        defaultTokens={ [] }
        onChange={ event => this.onChange(event) }
      />
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
