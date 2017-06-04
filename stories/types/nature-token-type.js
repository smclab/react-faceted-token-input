const NATURES = {
  'jbpm.ProcessInstance': "Process Instance",
  'liferay.WebContent': "Web Content"
}

export default class NatureTokenType {

  constructor() {
    this.type = 'nature';
  }

  getTitle() {
    return "Type";
  }

  renderToken(token) {
    return {
      description: NATURES[token.value],
      dropdownMenu: Object.keys(NATURES).map(value => ({
        label: NATURES[value],
        current: (token.value === value),
        result: { ...token, value }
      }))
    };
  }

  getTokenSuggestions(searchText) {
    const search = String(searchText).trim().toLowerCase();

    if (!search) {
      return [];
    }

    const match = (str) => (str.toLowerCase().indexOf(search) === 0);

    return Object.keys(NATURES)
      .filter(value => match(value) || match(NATURES[value]))
      .map(value => ({
        id: 'nature-' + value,
        result: { type: 'nature', value },
        description: NATURES[value]
      }));
  }

}
