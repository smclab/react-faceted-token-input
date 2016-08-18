/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Token from './Token';
import DropdownMenu from './DropdownMenu';

import onLeftRight from './onLeftRight';
import uniqueId from './unique-id';

import type {
  ComponentClassesType,
  FacetedTokenInputStateType,
  SuggestionType,
  LeftRightReturn,
  SectionType
} from './types';

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

/*
 import  a11y from 'react-a11y';
 import ReactDOM from 'react-dom';

 a11y(React, { ReactDOM: ReactDOM });
*/

type renderTokenTypes = {
  description: string,
  dropdownMenu: React$Element<any>,
  facet: string
}

type defaultPropTypesConfig = {
	componentClasses: ComponentClassesType,
	defaultTokens: [any]
}

type customElementsType = {
  check: React$Element<any>,
  dropdownArrow: string
}

type PropTypesConfig = {
	onChange: (input: any) => void,
	renderToken: (token: any) => renderTokenTypes,
  children: React$Element<any>,
  componentClasses: ComponentClassesType,
  customElements: customElementsType,
  defaultTokens: [any],
  dir: string,
  dropdownSections: [SectionType],
  placeholder: string
}

export const DIRECTION_NONE = 'none';
export const DIRECTION_BACKWARD = 'backward';
export const DIRECTION_FORWARD = 'forward';

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

let counter: number = 0;

export default class FacetedTokenInput extends Component {
	props: PropTypesConfig;
	state: FacetedTokenInputStateType;
	id: number;

	static defaultProps: defaultPropTypesConfig;

  constructor(props: PropTypesConfig) {
    super(props);

    this.id = counter++;

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
    const { placeholder, dir, componentClasses }: PropTypesConfig = this.props;

    const {
      tokens,
      searchText,
      showDropDown,
      focused,
      textDirection,
      selectedSectionIndex,
      selectedIndex
    }: FacetedTokenInputStateType = this.state;

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
          aria-activedescendant={
            uniqueId({
              id: this.id.toString(),
              sectionIndex: selectedSectionIndex,
              index: selectedIndex
            })
          }
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
    const { dropdownSections, componentClasses }: PropTypesConfig = this.props;

    const {
      selectedId,
      selectedSectionIndex,
      selectedIndex
    }: FacetedTokenInputStateType = this.state;

    if (!dropdownSections || !dropdownSections.length) {
      return null;
    }

    return (
      <DropdownMenu
        id = { this.id.toString() }
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

  renderToken(token: any, index: number): React$Element<any> {

    const { componentClasses, customElements }: PropTypesConfig = this.props;
    const {
      facet,
      description,
      dropdownMenu
    }: renderTokenTypes = this.props.renderToken(token);

    return (
      <Token
        id = { this.id }
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

      const {
        tokens,
        tokenSelectionDirection,
        tokenSelectionStart,
        tokenSelectionEnd
      }: FacetedTokenInputStateType = this.state;

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

  checkDir(tokens: any, searchText: string): void {
    const { dir }: PropTypesConfig = this.props;

    const { requiresDirCheck }: FacetedTokenInputStateType = this.state;

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

  isInTokenSelection(index: number): boolean {
    return (
      (index >= this.state.tokenSelectionStart) &&
      (index < this.state.tokenSelectionEnd)
    );
  }

  onInputFocus(event: any): void {
    const { tokens } = this.state;

    if (!this.isInTokenSelection(tokens.length)) {
      this.onTokenFocus(event, tokens.length);
    }
  }

  onChange(event: any): void {
    const { tokens }: FacetedTokenInputStateType = this.state;

    const searchText: string = this.refs.input.value;

    if (searchText) {
      this.setState({
        showDropDown: true
      });
    }
    else {
      this.setState({
        showDropDown: false
      });
    }

    this.setState({
      searchText: searchText,
      selectedSectionIndex: -1,
      selectedIndex: -1
    });

    this.checkDir(tokens, searchText);

    this.props.onChange({ tokens, searchText });

    this.onTokenFocus(event, tokens.length);
  }

  onTokenFocus(event: any, index: number): void {
    this.setState({
      tokenSelectionDirection: DIRECTION_NONE,
      tokenSelectionStart: index,
      tokenSelectionEnd: index + 1
    });
  }

  onFocus(event: any): void {
    this.setState({ focused: true });
  }

  onBlur(event: any): void {
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

  onKeyDown(event: any): ?boolean {
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

  onUpDown(event: any): void {
    const {
      tokens,
      showDropDown,
      selectedSectionIndex,
      selectedIndex
    }: FacetedTokenInputStateType = this.state;

    const { dropdownSections }: PropTypesConfig = this.props;

    if (showDropDown && dropdownSections) {
      event.preventDefault();

      let nextSelectedSectionIndex: number = 0;
      let nextSelectedIndex: number = 0;

      const section: SectionType = dropdownSections[selectedSectionIndex];

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

      const nextSection: SectionType =
        dropdownSections[nextSelectedSectionIndex];

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

  onLeftRightPress(event: any): boolean {
    type InputRefsType = {
      selectionEnd: number,
      selectionStart: number,
      selectionDirection: string
    }

    const {
      selectionEnd,
      selectionStart,
      selectionDirection
    }: InputRefsType = this.refs.input;

    const { dir }: PropTypesConfig = this.props;

    const { textDirection, tokens }: FacetedTokenInputStateType = this.state;

    let {
      tokenSelectionDirection,
      tokenSelectionEnd,
      tokenSelectionStart
    }: FacetedTokenInputStateType = this.state;

    const keyDirection: string = isForward(event, dir || textDirection)
      ? DIRECTION_FORWARD
      : isBackward(event, dir || textDirection) ? DIRECTION_BACKWARD
      : DIRECTION_NONE;

    const home: boolean = isHome(event);
    const end: boolean = isEnd(event);
    const selectToHome: boolean = isSelectToHome(event);
    const selectToEnd: boolean = isSelectToEnd(event);
    const shiftKey: boolean = event.shiftKey;

    const result: LeftRightReturn = onLeftRight(
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

  onBackspace(event: any): void {
    const {
      searchText,
      tokens,
      tokenSelectionStart,
      tokenSelectionEnd
    }: FacetedTokenInputStateType = this.state;

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

    if (event.target !== this.refs.input ||
      (event.target === this.refs.input && !searchText)) {

      event.preventDefault();
    }
  }

  onEnter(event: any): void {
    const {
      showDropDown,
      selectedSectionIndex,
      selectedIndex
    }: FacetedTokenInputStateType = this.state;

    const { dropdownSections }: PropTypesConfig = this.props;

    if (showDropDown) {
      this.setState({
        showDropDown: false
      });

      if (!dropdownSections) {
        return;
      }

      const section: SectionType = dropdownSections[selectedSectionIndex];

      if (!section) {
        return;
      }

      const suggestion: SuggestionType = section.suggestions[selectedIndex];

      if (!suggestion) {
        return;
      }

      this.addToken(suggestion.result);
    }
  }

  addToken(token: any): void {
    const { tokens }: FacetedTokenInputStateType = this.state;

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

  updateToken(token: any, index: number): void {
    const { searchText, tokens }: FacetedTokenInputStateType = this.state;

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
