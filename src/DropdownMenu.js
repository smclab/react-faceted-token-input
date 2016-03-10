import React from 'react';
import classNames from 'classnames';

const DropdownMenuSeparator = () => <hr />;

const DropdownMenuItem = ({
  selected,
  suggestion,
  sectionIndex,
  index,
  addToken,
  setSelected,
  componentClasses
}) => (
  <li className={ classNames({ 'active': selected },
    componentClasses.suggestionsLi) }>

    <a
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
  <ul className={ classNames(componentClasses.suggestionsUl) }>
    {
      section.title &&
      <li
        key="header"
        className={ classNames('header', componentClasses.sectionTitle) }
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
      />
    ))}
  </ul>
);

const DropdownMenu = ({ sections, componentClasses, ...props }) => (
  <div className={
    classNames('dropdown input-dropdown', componentClasses.suggestionsWrap)
  }>

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
