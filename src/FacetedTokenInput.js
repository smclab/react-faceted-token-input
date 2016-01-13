
import React, { Component } from 'react';
import classNames from 'classnames';

import Token from './Token';
import DropdownMenu from './DropdownMenu';

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
  isHome,
  isEnd,
  isSelectToHome,
  isSelectToEnd,
  isForward,
  isBackward
} from './key-utils';

const DIRECTION_NONE = 'none';
const DIRECTION_BACKWARD = 'backward';
const DIRECTION_FORWARD = 'forward';

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
  defaultTokens: []
};

export default class FacetedTokenInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      searchText: '',
      searchTextBasis: '0px',
      tokens: props.defaultTokens || [],
      showDropDown: false,
      selectedSectionIndex: -1,
      selectedIndex: -1,
      selectedId: null,
      tokenSelectionDirection: 'none',
      tokenSelectionStart: -1,
      tokenSelectionEnd: -1
    };
  }

  render() {
    const { placeholder } = this.props;

    const {
      tokens,
      searchText,
      searchTextBasis,
      showDropDown,
      focused
    } = this.state;

    const facetedTokenInputClass = classNames('compound-input', {
      'focused': focused
    });

    return (
      <div
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
          style={ INPUT_STYLE }
          className="compound-input-field"
          placeholder={ tokens.length ? '' : placeholder }
          value={ searchText }
          selectionStart={ 0 }
          selectionEnd={ 1 }
          onChange={ event => this.onChange(event) }
          onFocus={ event => this.onInputFocus(event) }
        />

        <span style={ INPUT_SPY_WRAPPER_STYLE }>
          <span key="input-spy" ref="inputSpy" style={ INPUT_SPY_STYLE }>
            { searchText }
          </span>
        </span>

        { this.props.children }

        { showDropDown && this.renderDropdown() }
      </div>
    );
  }

  renderDropdown() {
    const { dropdownSections } = this.props;

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
    const { facet, description, dropdownMenu } = this.props.renderToken(token);

    return (
      <Token
        key={ 'token' + (token.id || index) }
        ref={ 'token' + index }
        index={ index }
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
      const {
        tokens,
        tokenSelectionDirection,
        tokenSelectionStart,
        tokenSelectionEnd
      } = this.state;

      const noSelection = (tokenSelectionStart < 0) && (tokenSelectionEnd < 0);

      if (noSelection || this.isInTokenSelection(tokens.length)) {
        this.refs.input.focus();
      }
      else if (tokenSelectionDirection === DIRECTION_NONE) {
        this.refs['token' + tokenSelectionStart].focus();
      }
      else {
        this.refs.facetedTokenInput.focus();
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
        return this.onLeftRight(event);
      default:
        if (isHome(event) || isEnd(event)) {
          return this.onLeftRight(event);
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

  onLeftRight(event) {
    const {
      selectionStart,
      selectionDirection
    } = this.refs.input;

    let {
      tokens,
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    } = this.state;

    const keyDirection = isForward(event) ? DIRECTION_FORWARD
      : isBackward(event) ? DIRECTION_BACKWARD :
      DIRECTION_NONE;

    const home = isHome(event);
    const end = isEnd(event);
    const selectToHome = isSelectToHome(event);
    const selectToEnd = isSelectToEnd(event);

    if (!home && !end && !selectToHome && !selectToEnd && tokenSelectionStart >= tokens.length) {
      // The text field is focused

      if (selectionStart > 0) {
        // We’re moving inside the text field
        return;
      }

      if (selectionDirection === DIRECTION_FORWARD) {
        // The 'caret' is on the opposite side
        return;
      }

      if (selectionDirection === DIRECTION_BACKWARD && !event.shiftKey) {
        // We do have a selection but we’re exiting it on the left
        return;
      }

      if (keyDirection === DIRECTION_FORWARD) {
        // We are moving on the opposite side
        return;
      }
    }

    if (selectToHome) {
      tokenSelectionStart = 0;

      if ((tokenSelectionEnd - tokenSelectionStart) > 1) {
        if (tokenSelectionDirection === DIRECTION_NONE) {
          tokenSelectionDirection = DIRECTION_BACKWARD;
        }
      }
    }
    else if (selectToEnd) {
      tokenSelectionEnd = tokens.length + 1;

      this.refs.input.setSelectionRange(
        selectionStart, this.refs.input.value.length);

      if (tokenSelectionStart < tokens.length) {
        this.refs.input.setSelectionRange(
          0, this.refs.input.value.length);
      }

      if ((tokenSelectionEnd - tokenSelectionStart) > 1) {
        if (tokenSelectionDirection === DIRECTION_NONE) {
          tokenSelectionDirection = DIRECTION_FORWARD;
        }
      }
    }
    else if (home) {
      if (tokens.length > 0) {
        event.preventDefault();
        this.refs.input.setSelectionRange(0, 0);
        tokenSelectionStart = 0;
        tokenSelectionEnd = 1;
      }
    }
    else if (end) {
      event.preventDefault();
      this.refs.input.setSelectionRange(
        this.refs.input.value.length, this.refs.input.value.length)
    }
    else if (!event.shiftKey) {
      if (tokenSelectionEnd <= tokens.length) {
        event.preventDefault();
      }

      if (tokenSelectionDirection === DIRECTION_NONE) {
        if (keyDirection === DIRECTION_FORWARD) {
          tokenSelectionStart += 1;
          tokenSelectionEnd += 1;
        }
        else if (keyDirection === DIRECTION_BACKWARD) {
          tokenSelectionStart -= 1;
          tokenSelectionEnd -= 1;
        }
      }
      else if (keyDirection === DIRECTION_FORWARD) {
        tokenSelectionStart = tokenSelectionEnd - 1;
      }
      else if (keyDirection === DIRECTION_BACKWARD) {
        tokenSelectionEnd = tokenSelectionStart + 1;
      }

      tokenSelectionDirection = DIRECTION_NONE;

      if (tokenSelectionStart < tokens.length) {
        this.refs.input.setSelectionRange(0, 0);
      }
    }
    else {
      if (tokenSelectionEnd <= tokens.length) {
        event.preventDefault();
      }

      const initialIsInputInSelection = (tokenSelectionEnd > tokens.length);

      if (tokenSelectionDirection === DIRECTION_NONE) {
        tokenSelectionDirection = keyDirection;
      }

      const increment = (tokenSelectionDirection === keyDirection) ? 1 : -1;

      if (tokenSelectionDirection === DIRECTION_FORWARD) {
        tokenSelectionEnd += increment;
      }
      else if (tokenSelectionDirection === DIRECTION_BACKWARD) {
        tokenSelectionStart -= increment;
      }

      if ((tokenSelectionEnd - tokenSelectionStart) <= 1) {
        tokenSelectionDirection = DIRECTION_NONE;
      }

      if (tokenSelectionEnd > tokens.length) {
        if (keyDirection !== tokenSelectionDirection) {
          event.preventDefault();
        }

        if (!initialIsInputInSelection && (keyDirection === DIRECTION_FORWARD)) {
          this.refs.input.setSelectionRange(0, 1);
        }
      }
    }

    tokenSelectionStart = Math.max(0, tokenSelectionStart);
    tokenSelectionEnd = Math.max(tokenSelectionStart + 1, tokenSelectionEnd);

    tokenSelectionEnd = Math.min(tokens.length + 1, tokenSelectionEnd);
    tokenSelectionStart = Math.min(tokenSelectionEnd - 1, tokenSelectionStart);

    this.setState({
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    });
  }

  onBackspace(event) {
    const { tokens, tokenSelectionStart, tokenSelectionEnd } = this.state;

    this.setState({
      tokens: [
        ...tokens.slice(0, tokenSelectionStart),
        ...tokens.slice(tokenSelectionEnd)
      ]
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

    this.props.onChange({
      searchText: '',
      tokens: nextTokens
    });
  }

  updateToken(token, index) {
    const { tokens } = this.state;

    this.setState({
      tokens: [
        ...tokens.slice(0, index),
        token,
        ...tokens.slice(index + 1)
      ]
    });
  }

  updateInputFlexBasis() {
    // Very brutal and performant way of handling autogrow

    this.refs.input.style.flexBasis =
      (this.refs.inputSpy.offsetWidth + 1) + 'px';
  }

}

FacetedTokenInput.defaultProps = DEFAULT_PROPS;
