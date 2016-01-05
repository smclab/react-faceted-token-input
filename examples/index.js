
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import CompoundInput from '../src/CompoundInput';

const NUMERIC_COMPARATORS = [ 'eq', 'gt', 'lt' ];

const CHECK = <span className="check">✓</span>;

class App extends Component {

  renderTokenDropDown(token, updateToken, index) {
    if (token.type === 'numeric') {
      return NUMERIC_COMPARATORS.map(comparator => ({
        onClick: () => updateToken({ ...token, comparator }),
        current: (comparator === token.comparator),
        view: comparator
      }));
    }
    else {
      return null;
    }
  }

  renderToken(token, showDropDown, index) {
    if (token.type === 'numeric') {
      return (
        <span className="token facet">
          <span className="facet-type" onClick={ showDropDown }>
            { token.comparator }
            { ' ▾' }
          </span>
          <span className="facet-value">{ token.value }</span>
        </span>
      );
    }
    else {
      return token.label;
    }
  }

  getToken(value) {
    if (/^\d+$/.test(value.trim())) {
      return {
        type: 'numeric',
        comparator: 'eq',
        value: value
      };
    }
    else {
      return {
        label: value
      };
    }
  }

  render() {
    return (
      <CompoundInput
        renderToken={ this.renderToken }
        renderTokenDropDown={ this.renderTokenDropDown }
        getToken={ this.getToken }
        defaultTokens={ 'a b c d e f'.split(' ').map(label => ({ label })) }
      />
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
