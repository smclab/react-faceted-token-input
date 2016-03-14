import React from 'react';

import { UNIQUE_ID } from './FacetedTokenInput';

const DropdownMenuSeparator = () => <hr aria-hidden="true" />;

const DropdownMenuItem = ({
  selected,
  suggestion,
  sectionIndex,
  index,
  addToken,
  setSelected
}) => (
  <li
    role="listitem"
    className={ selected ? 'active' : '' }
    id={ UNIQUE_ID + '0' + sectionIndex + '0' + index }
  >
    <a
      role="listitem"
      href="javascript: void 0"
      onClick={ () => addToken(suggestion.result) }
      onMouseMove={ () => setSelected({ sectionIndex, index }) }
    >
      { suggestion.description }
    </a>
  </li>
);

const DropdownMenuSection = ({ section, sectionIndex, ...props }) => (
  <ul role="listbox" aria-label={ section.title }>
    {
      section.title &&
      <li
        key="header"
        className="header"
        aria-label={ section.title }
        id={ section.title }
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
