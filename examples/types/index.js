
import NatureTokenType from './nature-token-type';
import StatusTokenType from './status-token-type';
import TextTokenType from './text-token-type';
import UserTokenType from './user-token-type';

const REGISTRY = [];
const REGISTRY_BY_TYPE = {};

registerTokenType(new StatusTokenType());
registerTokenType(new NatureTokenType());
registerTokenType(new UserTokenType());
registerTokenType(new TextTokenType());

export function registerTokenType(tokenType) {
  REGISTRY.push(tokenType);
  REGISTRY_BY_TYPE[tokenType.type] = tokenType;
}

export function getTokenType(type) {
  return REGISTRY_BY_TYPE[type] || REGISTRY_BY_TYPE.text;
}

const suggestionsErrorHandler = err => {
  console.log(err);

  return [];
};

export function getTokenSuggestions(searchText) {
  return Promise.all(REGISTRY.map(tokenType => {
    const title = tokenType.getTitle();
    const suggestions = tokenType.getTokenSuggestions(searchText);

    return Promise.resolve(suggestions).catch(suggestionsErrorHandler).then(suggestions => {
      return { title, suggestions };
    });
  })).then(sections => sections.filter(section => section.suggestions.length));
}
