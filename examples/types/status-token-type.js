
const STATUSES = {
  'running': 'Running',
  'completed': 'Completed',
  'suspended': 'Suspended',
  'aborted': 'Aborted'
};

const INDEX_MAP = Object.keys(STATUSES).reduce((memo, key) => {
  return {
    ...memo,
    [ key ]: key,
    [ STATUSES[key].toLowerCase() ]: key
  };
}, {});

const INDEX = Object.keys(INDEX_MAP);

export default class StatusTokenType {

  constructor() {
    this.type = 'status';
  }

  renderToken(token) {
    return {
      facet: 'Status',
      description: STATUSES[token.value],
      dropdownMenu: Object.keys(STATUSES).map(status => ({
        label: STATUSES[status],
        current: (token.value === status),
        result: { ...token, value: status }
      }))
    }
  }

  getTitle() {
    return 'Status';
  }

  getTokenSuggestions(searchText) {
    const search = String(searchText).trim().toLowerCase();

    if (!search) {
      return [];
    }

    return INDEX.filter(s => s.indexOf(search) === 0).map(key => ({
      id: 'status-' + key,
      result: { type: 'status', value: key },
      description: STATUSES[key]
    }));
  }

}
