import React from 'react';
import classNames from 'classnames';

import type {
	ComponentClassesType,
	SuggestionType
} from './types';
import uniqueId from './unique-id';

export type DropdownMenuItemConfig = {
  selected: boolean,
  suggestion: SuggestionType,
  sectionIndex: number,
  index: number,
  addToken: (result: any) => void,
  setSelected: any,
  componentClasses: ComponentClassesType,
  sectionTitle: string,
  id: string
};

export const DropdownMenuItem = ({
  selected,
  suggestion,
  sectionIndex,
  index,
  addToken,
  setSelected,
  componentClasses,
  sectionTitle,
  id
} : DropdownMenuItemConfig) => (
  <li
    className={ classNames(
      {
        'active': selected,
        [componentClasses.suggestionsLiSelected]: selected
      },
      componentClasses.suggestionsLi
    ) }
    role="option"
    id={ uniqueId({ id, sectionIndex, index }) }
    aria-labelledby={
      uniqueId({ id, sectionTitle }) +
      ' ' +
      uniqueId({ id, sectionIndex, index, a: 'o' })
    }
  >
    <a
      id={ uniqueId({ id, sectionIndex, index, a: 'o' }) }
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
