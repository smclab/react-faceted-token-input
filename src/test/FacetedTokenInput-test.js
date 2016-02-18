// Test suite for FacetedTokenInput.js

jest.dontMock('../FacetedTokenInput');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
//import FacetedTokenInput from '../FacetedTokenInput';

//const FacetedToken = require('../FacetedTokenInput');
const defaultToken = [];

var textInput = React.createClass({
  render: function() {
    return (
        <input ref="input" type="text" placeholder="Search..." />
    );
  }
});

describe('FacetedTokenInput', () => {

  it('should move left inside a text input', () => {

/*
    var textinput = TestUtils.renderIntoDocument(
      <FacetedTokenInput
        defaultTokens = {defaultToken}
        dropdownSections = {defaultToken}
        placeholder = "Search…"
      />
    );
*/

    var input = TestUtils.renderIntoDocument( <textInput /> );

    var node = ReactDOM.findDOMNode(input);

    node.value = 'giraffe';

    expect(node.value).toEqual('giraffe');

    TestUtils.Simulate.change(node);

    TestUtils.Simulate.keyUp(node, {key: "a", keyCode: 65, which: 65});

    console.log(node);

    expect(node.selectionStart).toEqual('0');

  });

});
