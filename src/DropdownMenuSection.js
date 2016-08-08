/* @flow */

import React from 'react';
import classNames from 'classnames';

import { DropdownMenuItem } from './DropdownMenuItem';

import type {
	ComponentClassesType,
	SuggestionType,
	SectionType
} from './types';

import type { DropdownMenuItemConfig } from './DropdownMenuItem';

import uniqueId from './unique-id';

export type DropdownMenuSectionConfig = DropdownMenuItemConfig & {
  section: SectionType,
  sectionIndex: number,
  componentClasses: ComponentClassesType,
  id: string,
	suggestions: SuggestionType
};

export const DropdownMenuSection = ({
  section,
  sectionIndex,
  componentClasses,
  id,
  ...props
} : DropdownMenuSectionConfig) => (
  <ul
    className={ classNames(componentClasses.suggestionsUl) }
    role="listbox"
    id={ uniqueId({ id, sectionIndex }) }
  >
    {
      section.title &&
      <li
        key="header"
        className={ classNames('header', componentClasses.sectionTitle) }
        aria-label={ section.title }
        id={ uniqueId({ id, sectionTitle: section.title }) }
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
        id = { id }
      />
    ))}
  </ul>
);
