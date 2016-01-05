
import React, { Component, Children } from 'react';
import classNames from 'classnames';

import { UP, DOWN } from './key-codes';

const CHECK = <span className="check">✓</span>;

export const TokenDropDownItem = ({ selected, current, view, ...props }) => (
  <li className={ selected ? 'active': ''}>
    <a { ...props }>
      { current && CHECK}
      { view }
    </a>
  </li>
);

export default class Token extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
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

    const dropdownItems =
      this.state.showDropDown ?
      renderTokenDropDown.call(this, token, updateToken, index) :
      null;

    const selectedIndex = !dropdownItems ? 0 :
      Math.max(-1, Math.min(dropdownItems.length - 1, this.state.selectedIndex));

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

        { dropdownItems && (
          <div className="token-dropdown">
            <ul>
              { dropdownItems.map((item, index) => (
                <TokenDropDownItem
                  { ...item }
                  onMouseEnter={ event => this.setState({ selectedIndex: index })}
                  selected={ index === selectedIndex }
                />
              ))}
            </ul>
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
    switch (event.which) {
      case UP:
      case DOWN:
        return this.onUpDown(event);
      default:
        return this.props.onKeyDown(event);
    }
  }

  onUpDown(event) {
    if (!this.state.showDropDown) {
      return this.setState({ showDropDown: true });
    }

    const { selectedIndex } = this.state;

    const increment = (event.which === UP) ? -1 : 1;

    this.setState({
      selectedIndex: Math.max(0, selectedIndex + increment)
    });
  }

  onFocus(event) {
    this.props.onFocus(event);
  }

  onBlur(event) {
    this.setState({
      selectedIndex: 0,
      showDropDown: false
    });
  }

  onDown(event) {
    this.setState({
      showDropDown: true
    })
  }

}
