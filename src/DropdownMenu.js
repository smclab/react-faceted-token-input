import React from 'react';

const DropdownMenuSeparator = () => <hr />;

const DropdownMenuItem = ({
  selected,
  suggestion,
  sectionIndex,
  index,
  addToken,
  setSelected
}) => (
  <li className={ selected ? 'active' : '' }>
    <a
      href="javascript: void 0"
      onClick={ () => addToken(suggestion.result) }
      onMouseMove={ () => setSelected({ sectionIndex, index }) }
    >
      { suggestion.description }
    </a>
  </li>
);

const DropdownMenuSection = ({ section, sectionIndex, ...props }) => (
  <ul>
    {
      section.title && <li key="header" className="header">
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
  <div className="dropdown input-dropdown">
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
