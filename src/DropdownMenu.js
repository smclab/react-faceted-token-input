/* @flow */

import React from 'react';
import classNames from 'classnames';

import { DropdownMenuSection } from './DropdownMenuSection';

import type {
	ComponentClassesType,
	SectionType
} from './types';
import type { DropdownMenuSectionConfig } from './DropdownMenuSection';

const DropdownMenuSeparator = () => <hr aria-hidden="true" />;

export type Suggestion = any;

export type DropdownMenuConfig = DropdownMenuSectionConfig & {
	sections: [SectionType],
	componentClasses: ComponentClassesType,
	id: string
};

const DropdownMenu = ({
	sections,
	componentClasses,
	id,
	...props
} : DropdownMenuConfig) => (
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
            id = { id }
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
