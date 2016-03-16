import React from 'react';

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
  sectionTitle
}) => (
  <li
    role="option"
    className={ selected ? 'active' : '' }
    id={ UNIQUE_ID + 'section_0' + sectionIndex + '_0' + index }
    aria-labelledby={ UNIQUE_ID + sectionTitle + ' ' + UNIQUE_ID + 'section_0' + sectionIndex + '_0' + index + '_1' }
  >
    <a
      id={ UNIQUE_ID + 'section_0' + sectionIndex + '_0' + index + '_1' }
      role="button"
      href="javascript: void 0"
      onClick={ () => addToken(suggestion.result) }
      onMouseMove={ () => setSelected({ sectionIndex, index }) }
    >
      { suggestion.description }
    </a>
  </li>
);

const DropdownMenuSection = ({ section, sectionIndex, ...props }) => (
  <ul role="listbox" id={ UNIQUE_ID + 'section_0' + sectionIndex }>
    {
      section.title &&
      <li
        key="header"
        className="header"
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
        sectionTitle={ section.title }
      />
    ))}
  </ul>
);

const DropdownMenu = ({ sections, ...props }) => (
  <div className="dropdown input-dropdown"  id="suggestions_box" >
    { sections.map((section, sectionIndex) => (
          <DropdownMenuSection
            { ...props }
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
