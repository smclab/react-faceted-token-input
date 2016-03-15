import React from 'react';
import classNames from 'classnames';

import { UNIQUE_ID } from './FacetedTokenInput';

import { SPACE, ENTER } from './key-codes';

const DropdownMenuSeparator = () => <hr aria-hidden="true" />;

const DropdownMenuItem = ({
  selected,
  suggestion,
  sectionIndex,
  index,
  addToken,
  setSelected,
  componentClasses,
  sectionTitle
}) => (
  <li
    className={ classNames(
      {
        'active': selected,
        [componentClasses.suggestionsLiSelected]: selected
      },
      componentClasses.suggestionsLi
    ) }
    role="option"
    id={ UNIQUE_ID + '0' + sectionIndex + '0' + index }
  >
    <a
      role="button"
      href="javascript: void 0"
      onClick={ () => addToken(suggestion.result) }
      onMouseMove={ () => setSelected({ sectionIndex, index }) }
      className={ classNames(componentClasses.suggestionsA) }
    >
      { suggestion.description }
    </a>
  </li>
);

const DropdownMenuSection = ({
  section,
  sectionIndex,
  componentClasses,
  ...props
}) => (
  <ul
    className={ classNames(componentClasses.suggestionsUl) }
    role="listbox"
    id={ UNIQUE_ID + 'section_0' + sectionIndex }
  >
    {
      section.title &&
      <li
        key="header"
        className={ classNames('header', componentClasses.sectionTitle) }
        aria-label={ section.title }
        id={ UNIQUE_ID + section.title }
      >
        { section.title }
      </li>
    }

    { section.suggestions.map((suggestion, index) => (
      <DropdownMenuItem
        { ...props }
        key={ 'item' + suggestion.id }
        selected={
          (props.selectedId === suggestion.id) ||
          (props.selectedSectionIndex === sectionIndex) &&
          (props.selectedIndex === index)
        }
        suggestion={ suggestion }
        sectionIndex={ sectionIndex }
        index={ index }
        componentClasses={ componentClasses }
        sectionTitle={ section.title }
      />
    ))}
  </ul>
);

const DropdownMenu = ({ sections, componentClasses, ...props }) => (
  <div className={
    classNames('dropdown input-dropdown', componentClasses.suggestionsWrap)
  }
    id="suggestions_box"
  >
    { sections.map((section, sectionIndex) => (
          <DropdownMenuSection
            { ...props }
            componentClasses={ componentClasses }
            key={ 'section' + sectionIndex }
            sectionIndex={ sectionIndex }
            section={ section }
          />
        ))
        .reduce((memo, o, sectionIndex) => [
          ...memo,
          <DropdownMenuSeparator key={ 'separator' + sectionIndex } />,
          o
        ], [])
        .slice(1) }
  </div>
);

export default DropdownMenu;
