/* @flow */

export type SelectionDirection = $PropertyType<
  HTMLInputElement,
  'selectionDirection'
>;

// Some typo in flow is causing this type definition to not accept 'rtl'.
// See https://github.com/facebook/flow/issues/2864
/*export type TextDirection = $PropertyType<HTMLElement, 'dir'>;*/
export type TextDirection = 'rtl' | 'ltr' | 'auto';

export type LeftRightReturn = {
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: SelectionDirection,
  tokenSelectionStart: number,
  tokenSelectionEnd: number,
  tokenSelectionDirection: SelectionDirection,
  mac: boolean,
  prevent: boolean
};

export type CustomElementsType = {
  dropdownArrow?: mixed,
  check?: mixed,
  delToken?: mixed
};

export type ComponentClassesType = {
  wrapper: string,
  wrapperFocused: string,
  input: string,
  tokenWrapper: string,
  token: string,
  tokenWithFacet: string,
  facet: string,
  description: string,
  dropdownWrap: string,
  dropdownUl: string,
  dropdownLi: string,
  dropdownA: string,
  suggestionsWrap: string,
  suggestionsUl: string,
  suggestionsLi: string,
  suggestionsLiSelected: string,
  sectionTitle: string,
  suggestionsA: string,
  delToken: string
};

export type FacetedTokenInputStateType = {
  focused: boolean,
  searchText: string,
  tokens: Array<any>,
  requiresDirCheck: ?boolean,
  showDropDown: boolean,
  selectedSectionIndex: number,
  selectedIndex: number,
  selectedId: ?number,
  tokenSelectionDirection: SelectionDirection,
  tokenSelectionStart: number,
  tokenSelectionEnd: number,
  textDirection: TextDirection
};

export type ResultType = {
  field: string,
  fuzzy: boolean,
  type: string,
  value: string
};

export type SuggestionType = {
  description: string,
  id: string,
  result: ResultType
};

export type SectionType = {
  title: string,
  suggestions: [SuggestionType]
};

export type TokenPropType = {
  componentClasses: ComponentClassesType,
  customElements: CustomElementsType,
  description: string,
  dropdownMenu: Array<any>,
  facet: string,
  id: string,
  index: number,
  selected: boolean,
  token: any,
  onKeyDown: (event: any) => void,
  onShowDropdown: (event: any) => void,
  onFocus: (event: any) => void,
  onUpdate: (event: any) => void
};

type DropdownMenuBaseConfig = {
  componentClasses: ComponentClassesType,
  addToken: (token: any) => any,
  id: string,
  selectedId: ?number,
  selectedIndex: number,
  selectedSectionIndex: number,
  setSelected: (event: any) => void
};

export type DropdownMenuConfig = DropdownMenuBaseConfig & {
  sections: [SectionType]
};

export type DropdownMenuSectionConfig = DropdownMenuBaseConfig & {
  sectionIndex: number,
  section: SectionType
};

export type DropdownMenuItemConfig = DropdownMenuBaseConfig & {
  index: number,
  sectionIndex: number,
  sectionTitle: string,
  selected: boolean,
  suggestion: SuggestionType
};
