export type ComponentClassesType = {
  wrapper: ?string,
  wrapperFocused: ?string,
  input: ?string,
  tokenWrapper: ?string,
  token: ?string,
  tokenWithFacet: ?string,
  facet: ?string,
  description: ?string,
  dropdownWrap: ?string,
  dropdownUl: ?string,
  dropdownLi: ?string,
  dropdownA: ?string,
  suggestionsWrap: ?string,
  suggestionsUl: ?string,
  suggestionsLi: ?string,
  suggestionsLiSelected: ?string,
  sectionTitle: ?string,
  suggestionsA: ?string,
  delToken: ?string
};

export type FacetedTokenInputStateType = {
  focused: boolean,
  searchText: string,
  tokens: [any],
  requiresDirCheck: ?string,
  showDropDown: boolean,
  selectedSectionIndex: number,
  selectedIndex: number,
  selectedId: ?number,
  tokenSelectionDirection: string,
  tokenSelectionStart: number,
  tokenSelectionEnd: number,
  textDirection: string
}

export type ResultType = {
  field: string,
  fuzzy: boolean,
  type: string,
  value: string
}

export type SuggestionType = {
  description: string,
  id: string,
  result: ResultType
}

export type SectionType = {
  title: string,
  suggestions: [SuggestionType]
}

export type LeftRightReturn = {
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: string,
  tokenSelectionStart: number,
  tokenSelectionEnd: number,
  tokenSelectionDirection: string,
  mac: boolean,
  prevent: boolean
};

export type TokenPropType = {
  componentClasses: ComponentClassesType,
  customElements: [any],
  description: string,
  dropdownMenu: ?[any],
  facet: string,
  id: string,
  index: number,
  selected: boolean,
  token: any,
  field: string,
  fuzzy: boolean,
  type: string,
  value: string
}

export type DropdownMenuConfig = {
  section: SectionType,
  sectionIndex: number,
  componentClasses: ComponentClassesType,
  id: string,
  suggestions: SuggestionType,
  sections: [SectionType],
  addToken: (token: any) => any,
  setSelected: (event: any) => void,
  selectedId: number,
  selectedIndex: number,
  selectedSectionIndex: number
};
