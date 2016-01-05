
import React, { Component, Children } from 'react';
import classNames from 'classnames';

import { DOWN } from './key-codes';

export default class Token extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropDown: false
    };
  }

  focus() {
    this.refs.container.focus();
  }

  render() {
    const {
      index,
      selected,
      onKeyDown,
      onUpdate,
      renderToken,
      renderTokenDropDown,
      token
    } = this.props;

    const updateToken = (token) => {
      this.setState({
        showDropDown: false
      });

      onUpdate({ token, index })
    };

    const showDropDown = () => this.setState({ showDropDown: true });

    const contents = renderToken.call(this, token, showDropDown, index);

    const dropdown =
      this.state.showDropDown ?
      renderTokenDropDown.call(this, token, updateToken, index) :
      null;

    // BAAAD HTML

    const containerClass = classNames({
      "token-container": true,
      token: typeof contents === "string",
      selected: selected
    });

    return (
      <div
        ref={ 'container' }
        tabIndex={ 0 }
        className={ containerClass }
        onContextMenu={ this.onContextMenu.bind(this) }
        onKeyDown={ this.onKeyDown.bind(this) }
        onFocus={ this.onFocus.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      >
        { contents }
        { dropdown && (
          <div className="token-dropdown">
            { dropdown }
          </div>
        )}
      </div>
    );
  }

  onContextMenu(event) {
    event.preventDefault();

    this.setState({
      showDropDown: true
    });
  }

  onKeyDown(event) {
    if (event.which === DOWN) {
      this.onDown(event);
    }
    else {
      this.props.onKeyDown(event);
    }
  }

  onFocus(event) {
    this.props.onFocus(event);
  }

  onBlur(event) {
    this.setState({
      showDropDown: false
    });
  }

  onDown(event) {
    this.setState({
      showDropDown: true
    })
  }

}
