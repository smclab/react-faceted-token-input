
import React, { Component, Children } from 'react';
import classNames from 'classnames';

import Token from './Token';
import { BACKSPACE, ENTER, LEFT, RIGHT, DOWN, UP } from './key-codes';
import { isOnlyCtrlKey } from './key-utils';

const DIRECTION_NONE = 'none';
const DIRECTION_BACKWARD = 'backward';
const DIRECTION_FORWARD = 'forward';

const INPUT_STYLE = {
  font: 'inherit',
  lineHeight: 'inherit',
  height: 'auto',
  padding: 0,
  margin: 0,
  border: 'none',
  flexGrow: 1,
  outline: 'none'
};

const DEFAULT_PROPS = {
  defaultTokens: []
};

export default class CompoundInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tokens: props.defaultTokens || [],
      focused: false,
      tokenSelectionDirection: 'none',
      tokenSelectionStart: -1,
      tokenSelectionEnd: -1
    };
  }

  render() {
    const onKeyDown = event => this.onKeyDown(event);
    const onFocus = event => this.onFocus(event);
    const onBlur = event => this.onBlur(event);

    const tokens = this.state.tokens.map(this.renderToken, this);

    const compoundInputClass = classNames("compound-input", {
      focused: this.state.focused
    });

    return (
      <div
        ref="compoundInput"
        tabIndex="0"
        className={ compoundInputClass }
        onKeyDown={ onKeyDown }
        onFocus={ onFocus }
        onBlur={ onBlur }
      >
        { tokens }
        <input
          style={ INPUT_STYLE }
          ref="input"
          onFocus={ event => this.onTokenFocus(event, tokens.length) }
        />
      </div>
    );
  }

  renderToken(token, index) {
    const onKeyDown = event => this.onKeyDown(event);
    const onFocus = event => this.onTokenFocus(event, index);
    const onUpdate = event => this.updateToken(event.token, event.index);

    return (
      <Token
        ref={ 'token' + index }
        index={ index }
        selected={ this.isInTokenSelection(index) }
        token={ token }
        onUpdate={ onUpdate }
        renderToken={ this.props.renderToken }
        renderTokenDropDown={ this.props.renderTokenDropDown }
        onKeyDown={ onKeyDown }
        onFocus={ onFocus }
      />
    )
  }

  componentDidUpdate() {
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
        this.refs.compoundInput.focus();
      }
    }
  }

  isInTokenSelection(index) {
    return (
      (index >= this.state.tokenSelectionStart) &&
      (index < this.state.tokenSelectionEnd)
    );
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
          tokenSelectionDirection: DIRECTION_NONE,
          tokenSelectionStart: -1,
          tokenSelectionEnd: -1
        })
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
        return this.onLeftRight(event);
    }
  }

  onUpDown(event) {
    const { tokens } = this.state;

    if (this.isInTokenSelection(tokens.length)) {
      this.setState({
        tokenSelectionDirection: DIRECTION_NONE,
        tokenSelectionStart: tokens.length,
        tokenSelectionEnd: tokens.length + 1,
      });
    }
  }

  onLeftRight(event) {
    const {
      selectionStart,
      selectionEnd,
      selectionDirection
    } = this.refs.input;

    const hasCaret = (selectionStart === selectionEnd);

    let {
      tokens,
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    } = this.state;

    const hasTokenCaret = (tokenSelectionStart === tokenSelectionEnd)

    // TODO: Manage RTL languages

    const keyDirection =
      (event.which === RIGHT) ? DIRECTION_FORWARD :
      (event.which === LEFT) ? DIRECTION_BACKWARD :
      DIRECTION_NONE;

    if (tokenSelectionStart >= tokens.length) {
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

    event.preventDefault();

    if (!event.shiftKey) {
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
    }
    else {
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
    /*const { selectionStart, selectionEnd } = this.refs.input;

    if (selectionStart === 0 && selectionEnd === 0) {
      event.preventDefault();
      this.props.onBack();
    }*/

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
    const { tokens } = this.state;

    const { value } = this.refs.input;

    if (!value) {
      return;
    }

    this.setState({
      tokens: [
        ...tokens,
        this.props.getToken(value)
      ],
      tokenSelectionDirection: DIRECTION_NONE,
      tokenSelectionStart: tokens.length + 1,
      tokenSelectionEnd: tokens.length + 2
    });

    this.refs.input.value = '';
  }

  updateToken(token, index) {
    const { tokens } = this.state;

    this.setState({
      tokens: [
        ...tokens.slice(0, index),
        token,
        ...tokens.slice(index + 1)
      ]
    })
  }

};

CompoundInput.defaultProps = DEFAULT_PROPS;
