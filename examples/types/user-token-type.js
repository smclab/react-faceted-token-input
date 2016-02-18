import React from 'react';

const FIELDS = {
  'author': 'Author',
  'mention': 'Mentioned',
  'modifier': 'Modified by…'
};

const USERS = [
  [ 'Davide', '', 'Roman' ],
  [ 'Fabio', '', 'Pezzutto' ],
  [ 'Marco', '', 'Tessarin' ],
  [ 'Mauro', '', 'Mariuzzo' ],
  [ 'Paolo', '', 'Valeri' ],
  [ 'Pier Paolo', '', 'Ramon' ]
].map(
  ([ firstName, middleName, lastName ], id) =>
    ({ id, firstName, middleName, lastName })
);

export default class UserTokenType {

  constructor() {
    this.type = 'user';
  }

  getTitle() {
    return 'Contacts';
  }

  renderToken(token) {
    return {
      facet: token.field,
      description: (
        <span>
          {'👤 '}
          { token.firstName.slice(0, 1) }
          { ' ' }
          { token.middleName.slice(0, 1) }
          { ' ' }
          { token.lastName.slice(0, 1) }
        </span>
      ),
      dropdownMenu: Object.keys(FIELDS).map(field => ({
        label: FIELDS[field],
        current: (token.field === field),
        result: {
          ...token,
          field
        }
      }))
    };
  }

  getTokenSuggestions(searchText) {
    const search = String(searchText).trim().toLowerCase();

    if (!search) {
      return [];
    }

    const delay = 0;//300 + Math.round(Math.random() * 500);

    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      return USERS.filter(this.getMatcher(search)).map(user => ({
        id: 'user-' + user.id,
        description: user.firstName + ' ' + user.lastName,
        result: {
          type: 'user',
          field: 'author',
          ...user
        }
      }))
    });
  }

  getMatcher(searchText) {
    const test = (str, ...a) => (String(str).toLowerCase().indexOf(searchText) === 0);
    return (user) => Object.keys(user).some(key => test(user[key]));
  }

}
