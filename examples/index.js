
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import CompoundInput from '../src/CompoundInput';

const NUMERIC_COMPARATORS = {
  'eq': 'Equals to…',
  'gt': 'Greater then…',
  'lt': 'Less then…'
};

const STATUSES = {
  'running': 'Running',
  'completed': 'Completed',
  'suspended': 'Suspended',
  'aborted': 'Aborted'
};

const CHECK = <span className="check">✓</span>;

class App extends Component {

  /*renderTokenDropDown(token, updateToken, index) {
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
  }*/

  renderToken(token) {
    let facet, description, dropdownMenu;

    if (token.type === 'numeric') {
      facet = token.comparator;
      description = token.value;
      dropdownMenu = Object.keys(NUMERIC_COMPARATORS).map(comparator => ({
        label: NUMERIC_COMPARATORS[comparator],
        current: (token.comparator === comparator),
        result: { ...token, comparator }
      }));
    }
    else if (token.type === 'user') {
      facet = '👤';
      description = (
        <span>
          { token.firstName }
          { ' ' }
          { token.middleName }
          { ' ' }
          { token.lastName }
        </span>
      );
    }
    else if (token.type === 'status') {
      facet = 'Status';
      description = STATUSES[token.value];
      dropdownMenu = Object.keys(STATUSES).map(status => ({
        label: STATUSES[status],
        current: (token.value === status),
        result: { ...token, value: status }
      }));
    }
    else {
      description = token.label;
    }

    return {
      facet, description, dropdownMenu
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
    else if (value.toLowerCase().indexOf('pier') >= 0) {
      return {
        type: 'user',
        firstName: 'Pier Paolo',
        middleName: '',
        lastName: 'Ramon'
      };
    }
    else if (value.toLowerCase().indexOf('fabio') >= 0) {
      return {
        type: 'user',
        firstName: 'Fabio',
        middleName: '',
        lastName: 'Pezzutto'
      };
    }
    else if (value.toLowerCase().indexOf('marco') >= 0) {
      return {
        type: 'user',
        firstName: 'Marco',
        middleName: '',
        lastName: 'Tessarin'
      };
    }
    else if (value.trim().toLowerCase() in STATUSES) {
      return {
        type: 'status',
        value: value.trim().toLowerCase()
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
        placeholder="Search…"
        defaultTokens={ 'a b c d e f'.split(' ').map(label => ({ label })) }
      />
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
