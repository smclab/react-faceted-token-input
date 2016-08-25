
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import * as TokenTypes from './types';
import { RESULTS } from './types/result-field-token-type';

import FacetedTokenInput from '../src/FacetedTokenInput';

const NUMERIC_COMPARATORS = {
  'eq': 'Equals to…',
  'gt': 'Greater then…',
  'lt': 'Less then…'
};

const CHECK = <span className="check">✓</span>;

const componentClasses = {
  'wrapper': 'test1',
  'input': 'test2',
  'tokenWrapper': 'test3',
  'token': 'test4',
  'facet': 'test5',
  'description': 'test6',
  'dropdownWrap': 'test7',
  'dropdownUl': 'test8',
  'dropdownLi': 'test9',
  'dropdownA': 'test10',
  'suggestionsWrap': 'test11',
  'suggestionsUl': 'test12',
  'suggestionsLi': 'test13',
  'suggestionsA': 'test14',
  'delToken': 'del-btn-style'
}

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
        componentClasses={ componentClasses }
        renderToken={ this.renderToken }
        dropdownSections={ this.state.dropdownSections }
        placeholder="Search…"
        defaultTokens={ [] }
        onChange={ event => this.onChange(event) }
      />
    );
  }

}

class Results extends Component {
  render() {
    return (
      <div className="list-group">
        { RESULTS.map((result, index) =>
          <a key={ 'result' + index } href="#" className="list-group-item">
            <p className="list-group-item-text pull-right">{ result.createDate }</p>
            <h4 className="list-group-item-heading">
              { result.description || '…' }{ ' ' }
              <small>({ result.status })</small>
            </h4>
            <p className="list-group-item-text">{ result.product }</p>
          </a>
        )}
      </div>
    );
  }
}

ReactDOM.render((
  <div>
    <div className="bar">
      <div className="opensquare" />
      <div className="grow">
        <App />
      </div>
    </div>
    <hr />
    <Results />
  </div>
), document.getElementById('root'));
