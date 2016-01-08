const FIELDS = {
  "product": "Product",
  "description": "Description"
};

export const RESULTS = [
  {
    "product": "NPMP50000",
    "description": "",
    "status": "1-Compilazione-Richiesta",
    "createDate": "21/02/2015"
  },
  {
    "product": "NPMP50078",
    "description": "MODIFICA KIT RICAMBIO",
    "status": "4-Decisione-Richiedente",
    "createDate": "21/11/2014"
  },
  {
    "product": "NPMP50045",
    "description": "MODIFICA FRONTALE DOT-MATRIX 5M LOW",
    "status": "4-Decisione-Richiedente",
    "createDate": "02/10/2014"
  },
  {
    "product": "NPMP50046",
    "description": "GR SCHEDA HAGC03-8X03 GPL - NUOVO PRODOTTO",
    "status": "6-Verifica-Finale",
    "createDate": "02/10/2014"
  },
  {
    "product": "NPMP50053",
    "description": "C63-0110 - MODIFICA HW",
    "status": "7-Chiusa",
    "createDate": "02/08/2014"
  }
];

export default class ResultFieldTokenType {

  constructor(field) {
    this.field = field;
    this.type = 'field-' + field;
    this.values = RESULTS.map(o => o[field]).filter(Boolean);
  }

  renderToken(token) {
    return {
      facet: FIELDS[token.field],
      description: token.value
    };
  }

  getTitle() {
    return FIELDS[this.field];
  }

  getTokenSuggestions(searchText) {
    const search = String(searchText).trim().toLowerCase();

    if (!search) {
      return [];
    }

    return this.values
      .filter(value => value.toLowerCase().indexOf(search) === 0)
      .map((value, index) => ({
        id: this.type + '-' + index,
        description: FIELDS[this.field] + ': ' + value,
        result: {
          type: this.type,
          field: this.field,
          value: value
        }
      }));
  }

}
