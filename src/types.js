export type ComponentClassesType = {
	wrapper?: string,
	wrapperFocused?: string,
	input?: string,
	tokenWrapper?: string,
	token?: string,
	tokenWithFacet?: string,
	facet?: string,
	description?: string,
	dropdownWrap?: string,
	dropdownUl?: string,
	dropdownLi?: string,
	dropdownA?: string,
	suggestionsWrap?: string,
	suggestionsUl?: string,
	suggestionsLi?: string,
	suggestionsLiSelected?: string,
	sectionTitle?: string,
	suggestionsA?: string
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
