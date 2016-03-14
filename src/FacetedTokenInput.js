import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Token from './Token';
import DropdownMenu from './DropdownMenu';

import onLeftRight from './onLeftRight';

import  a11y from 'react-a11y';
import ReactDOM from 'react-dom';

import {
  BACKSPACE,
  ENTER,
  LEFT,
  RIGHT,
  DOWN,
  UP,
  END,
  HOME
} from './key-codes';

import {
  IS_MAC,
  isRTL,
  isHome,
  isEnd,
  isSelectToHome,
  isSelectToEnd,
  isForward,
  isBackward
} from './key-utils';

// Abilitate accessibility test only in development mode
// a11y(React, { ReactDOM: ReactDOM });

export const DIRECTION_NONE = 'none';
export const DIRECTION_BACKWARD = 'backward';
export const DIRECTION_FORWARD = 'forward';

export const UNIQUE_ID = 'fti_';

const INPUT_STYLE = {
  font: 'inherit',
  lineHeight: 'inherit',
  height: 'auto',
  padding: 0,
  border: 'none',
  flexGrow: 1,
  outline: 'none'
};

const INPUT_SPY_WRAPPER_STYLE = {
  position: 'absolute',
  visibility: 'hidden',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '0px',
  overflow: 'hidden'
};

const INPUT_SPY_STYLE = {
  display: 'block',
  whiteSpace: 'pre',
  float: 'left'
};

const DEFAULT_PROPS = {
  defaultTokens: [],
  componentClasses: {}
};

const PROP_TYPES = {
  defaultTokens: PropTypes.array,
  placeholder: PropTypes.string,
  children: PropTypes.element,
  dropdownSections: PropTypes.array,
  renderToken: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  dir: PropTypes.oneOf(['rtl', 'ltr']),
  componentClasses: PropTypes.object,
  customElements: PropTypes.object
};

export default class FacetedTokenInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      searchText: '',
      tokens: props.defaultTokens || [],
      requiresDirCheck: !props.dir,
      showDropDown: false,
      selectedSectionIndex: -1,
      selectedIndex: -1,
      selectedId: null,
      tokenSelectionDirection: 'none',
      tokenSelectionStart: -1,
      tokenSelectionEnd: -1,
      textDirection: 'auto'
    };
  }

  render() {
    const { placeholder, dir, componentClasses } = this.props;

    const {
      tokens,
      searchText,
      showDropDown,
      focused,
      textDirection,
      selectedSectionIndex,
      selectedIndex
    } = this.state;

    const facetedTokenInputClass = classNames(
      'compound-input',
      {
        'focused': focused,
        [componentClasses.wrapperFocused]: focused
      },
      componentClasses.wrapper
    );

    const inputClass = classNames(
      'compound-input-field',
      componentClasses.input
    );

    return (
      <div
        dir={ dir || textDirection }
        ref="facetedTokenInput"
        tabIndex="0"
        className={ facetedTokenInputClass }
        onKeyDown={ event => this.onKeyDown(event) }
        onFocus={ event => this.onFocus(event) }
        onBlur={ event => this.onBlur(event) }
      >
        { tokens.map(this.renderToken, this) }

        <input
          key="input"
          ref="input"
          role="combobox"
          aria-expanded={ showDropDown }
          aria-autocomplete="list"
          aria-owns="suggestions_box"
          aria-activedescendant={ UNIQUE_ID + '0' + selectedSectionIndex + '0' + selectedIndex }
          aria-label="input"
          style={ INPUT_STYLE }
          className={ inputClass }
          placeholder={ tokens.length ? '' : placeholder }
          value={ searchText }
          selectionStart={ 0 }
          selectionEnd={ 1 }
          onChange={ event => this.onChange(event) }
          onFocus={ event => this.onInputFocus(event) }
        />

        <span style={ INPUT_SPY_WRAPPER_STYLE }>
          <span
            key="input-spy"
            ref="inputSpy"
            style={ INPUT_SPY_STYLE }
            dir={ dir || textDirection }
          >

            { searchText }
          </span>
        </span>

        { this.props.children }

        { showDropDown && this.renderDropdown() }
      </div>
    );
  }

  renderDropdown() {
    const { dropdownSections, componentClasses } = this.props;

    const {
      selectedId,
      selectedSectionIndex,
      selectedIndex
    } = this.state;

    if (!dropdownSections || !dropdownSections.length) {
      return null;
    }

    return (
      <DropdownMenu
        componentClasses={ componentClasses }
        sections={ dropdownSections }
        selectedId={ selectedId }
        selectedIndex={ selectedIndex }
        selectedSectionIndex={ selectedSectionIndex }
        addToken={ token => this.addToken(token) }
        setSelected={
          event => this.setState({
            selectedSectionIndex: event.sectionIndex,
            selectedIndex: event.index
          })
        }
      />
    );
  }

  renderToken(token, index) {
    const { componentClasses, customElements } = this.props;
    const { facet, description, dropdownMenu } = this.props.renderToken(token);

    return (
      <Token
        key={ 'token' + (token.id || index) }
        ref={ 'token' + index }
        index={ index }
        customElements={ customElements }
        componentClasses={ componentClasses }
        selected={ this.isInTokenSelection(index) }
        token={ token }
        facet={ facet }
        description={ description }
        dropdownMenu={ dropdownMenu }
        onUpdate={ event => this.updateToken(event.token, event.index) }
        onKeyDown={ event => this.onKeyDown(event) }
        onFocus={ event => this.onTokenFocus(event, index) }
        onShowDropdown={ event => this.setState({ showDropDown: false }) }
      />
    );
  }

  componentDidUpdate() {
    this.updateInputFlexBasis();

    if (this.state.focused) {
      const { dir } = this.props;

      const {
        tokens,
        tokenSelectionDirection,
        tokenSelectionStart,
        tokenSelectionEnd,
        searchText
      } = this.state;

      const noSelection = (tokenSelectionStart < 0) && (tokenSelectionEnd < 0);

      if (noSelection || this.isInTokenSelection(tokens.length)) {
        this.refs.input.focus();
      }
      else if (tokenSelectionDirection === DIRECTION_NONE) {
        if (this.refs['token' + tokenSelectionStart]) {
          this.refs['token' + tokenSelectionStart].focus();
        }
      }
      else {
        this.refs.facetedTokenInput.focus();
      }
    }
  }

  checkDir(tokens, searchText) {
    const { dir } = this.props;

    const { requiresDirCheck } = this.state;

    if (!dir) {
      if (requiresDirCheck && searchText.length) {
        this.setState({
          requiresDirCheck: false,
          textDirection: isRTL(searchText) ? 'rtl' : 'ltr'
        });
      }
      else if (!searchText.length && !tokens.length) {
        this.setState({
          requiresDirCheck: true
        });
      }
    }
  }

  isInTokenSelection(index) {
    return (
      (index >= this.state.tokenSelectionStart) &&
      (index < this.state.tokenSelectionEnd)
    );
  }

  onInputFocus(event) {
    const { tokens } = this.state;

    if (!this.isInTokenSelection(tokens.length)) {
      this.onTokenFocus(event, tokens.length);
    }
  }

  onChange(event) {
    const { tokens } = this.state;

    const searchText = this.refs.input.value;

    this.setState({
      searchText: searchText,
      showDropDown: true,
      selectedSectionIndex: -1,
      selectedIndex: -1
    });

    this.checkDir(tokens, searchText);

    this.props.onChange({ tokens, searchText });

    this.onTokenFocus(event, tokens.length);
  }

  onTokenFocus(event, index) {
    this.setState({
      tokenSelectionDirection: DIRECTION_NONE,
      tokenSelectionStart: index,
      tokenSelectionEnd: index + 1
    });
  }

  onFocus(event) {
    this.setState({ focused: true });
  }

  onBlur(event) {
    this.setState({ focused: false });

    setTimeout(() => {
      // focus out
      if (!this.state.focused) {
        this.setState({
          showDropDown: false,
          tokenSelectionDirection: DIRECTION_NONE,
          tokenSelectionStart: -1,
          tokenSelectionEnd: -1
        });
      }
    }, 0);
  }

  onKeyDown(event) {
    switch (event.which) {
      case ENTER:
        return this.onEnter(event);
      case BACKSPACE:
        return this.onBackspace(event);
      case UP:
      case DOWN:
        return this.onUpDown(event);
      case LEFT:
      case RIGHT:
      case HOME:
      case END:
        return this.onLeftRightPress(event);
      default:
        if (isHome(event) || isEnd(event)) {
          return this.onLeftRightPress(event);
        }
    }
  }

  onUpDown(event) {
    const {
      tokens,
      showDropDown,
      selectedSectionIndex,
      selectedIndex
    } = this.state;

    const { dropdownSections } = this.props;

    if (showDropDown && dropdownSections) {
      event.preventDefault();

      let nextSelectedSectionIndex;
      let nextSelectedIndex;

      const section = dropdownSections[selectedSectionIndex];

      if (event.which === DOWN) {
        nextSelectedSectionIndex = selectedSectionIndex;
        nextSelectedIndex = selectedIndex + 1;

        if (!section || (section.suggestions.length <= nextSelectedIndex)) {
          if (selectedSectionIndex < (dropdownSections.length - 1)) {
            nextSelectedSectionIndex += 1;
            nextSelectedIndex = 0;
          }
        }
      }
      else if (event.which === UP) {
        nextSelectedSectionIndex = selectedSectionIndex;
        nextSelectedIndex = selectedIndex - 1;

        if (nextSelectedIndex < 0) {
          if (selectedSectionIndex <= 0) {
            nextSelectedSectionIndex = -1;
            nextSelectedIndex = -1;
          }
          else {
            nextSelectedSectionIndex = selectedSectionIndex - 1;
            nextSelectedIndex =
              dropdownSections[nextSelectedSectionIndex].suggestions.length - 1;
          }
        }
      }

      nextSelectedSectionIndex = Math.max(
        -1, Math.min(dropdownSections.length - 1, nextSelectedSectionIndex)
      );

      const nextSection = dropdownSections[nextSelectedSectionIndex];

      nextSelectedIndex = Math.max(
        -1, Math.min(
          nextSection ? (nextSection.suggestions.length - 1) : 0,
          nextSelectedIndex
        )
      );

      this.setState({
        selectedSectionIndex: nextSelectedSectionIndex,
        selectedIndex: nextSelectedIndex
      });
    }
    else if (this.isInTokenSelection(tokens.length)) {
      this.setState({
        tokenSelectionDirection: DIRECTION_NONE,
        tokenSelectionStart: tokens.length,
        tokenSelectionEnd: tokens.length + 1
      });
    }
  }

  onLeftRightPress(event) {
    const {
      selectionEnd,
      selectionStart,
      selectionDirection
    } = this.refs.input;

    const { dir } = this.props;

    const { textDirection, tokens } = this.state;

    let {
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    } = this.state;

    const keyDirection = isForward(event, dir || textDirection) ? DIRECTION_FORWARD
      : isBackward(event, dir || textDirection) ? DIRECTION_BACKWARD
      : DIRECTION_NONE;

    const home = isHome(event);
    const end = isEnd(event);
    const selectToHome = isSelectToHome(event);
    const selectToEnd = isSelectToEnd(event);
    const shiftKey = event.shiftKey;

    const result = onLeftRight(
      selectionStart,
      selectionEnd,
      selectionDirection,
      tokens.length,
      tokenSelectionStart,
      tokenSelectionEnd,
      tokenSelectionDirection,
      home,
      end,
      selectToHome,
      selectToEnd,
      shiftKey,
      IS_MAC,
      keyDirection,
      this.refs.input.value
    );

    if (result) {
      if (result.prevent) {
        event.preventDefault();
      }

      this.refs.input.setSelectionRange(
        result.selectionStart,
        result.selectionEnd,
        result.selectionDirection
      );

      tokenSelectionStart = result.tokenSelectionStart;
      tokenSelectionEnd = result.tokenSelectionEnd;
      tokenSelectionDirection = result.tokenSelectionDirection;
    }

    this.setState({
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    });

    return false;
  }

  onBackspace(event) {
    const {
      searchText,
      tokens,
      tokenSelectionStart,
      tokenSelectionEnd
    } = this.state;

    const nextTokens = [
      ...tokens.slice(0, tokenSelectionStart),
      ...tokens.slice(tokenSelectionEnd)
    ];

    this.setState({
      tokens: nextTokens
    });

    this.checkDir(nextTokens, searchText);

    this.props.onChange({
      searchText,
      tokens: nextTokens
    });

    const { selectionStart, selectionEnd } = this.refs.input;

    const caretIsAtStart = (selectionStart === 0) && (selectionEnd === 0);

    if (this.isInTokenSelection(tokens.length) && caretIsAtStart) {
      this.setState({
        tokenSelectionDirection: DIRECTION_NONE,
        tokenSelectionStart: tokenSelectionStart - 1,
        tokenSelectionEnd: tokenSelectionStart
      });
    }
    else {
      this.setState({
        tokenSelectionDirection: DIRECTION_NONE,
        tokenSelectionStart: tokenSelectionStart,
        tokenSelectionEnd: tokenSelectionStart + 1
      });
    }

    if (event.target !== this.refs.input) {
      event.preventDefault();
    }
  }

  onEnter(event) {
    const {
      showDropDown,
      selectedSectionIndex,
      selectedIndex
    } = this.state;

    const { dropdownSections } = this.props;

    if (showDropDown) {
      this.setState({
        showDropDown: false
      });

      if (!dropdownSections) {
        return;
      }

      const section = dropdownSections[selectedSectionIndex];

      if (!section) {
        return;
      }

      const suggestion = section.suggestions[selectedIndex];

      if (!suggestion) {
        return;
      }

      this.addToken(suggestion.result);
    }
  }

  addToken(token) {
    const { tokens } = this.state;

    const nextTokens = tokens.concat([ token ]);

    this.setState({
      searchText: '',
      showDropDown: false,
      tokens: nextTokens,
      tokenSelectionDirection: DIRECTION_NONE,
      tokenSelectionStart: tokens.length + 1,
      tokenSelectionEnd: tokens.length + 2
    });

    this.checkDir(nextTokens, '');

    this.props.onChange({
      searchText: '',
      tokens: nextTokens
    });
  }

  updateToken(token, index) {
    const { searchText, tokens } = this.state;

    const nextTokens = [
      ...tokens.slice(0, index),
      token,
      ...tokens.slice(index + 1)
    ];

    this.setState({
      tokens: nextTokens
    });

    this.props.onChange({
      searchText,
      tokens: nextTokens
    });
  }

  updateInputFlexBasis() {
    // Very brutal and performant way of handling autogrow

    this.refs.input.style.flexBasis =
      (this.refs.inputSpy.offsetWidth + 1) + 'px';
  }

}

FacetedTokenInput.propTypes = PROP_TYPES;
FacetedTokenInput.defaultProps = DEFAULT_PROPS;
