export default class TextTokenType {

  constructor() {
    this.type = 'text';
  }

  getTitle() {
    return 'Textual search';
  }

  renderToken({ label }) {
    return {
      description: label
    };
  }

  getTokenSuggestions() {
    return [];
  }

}
