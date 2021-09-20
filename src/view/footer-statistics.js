import AbstractView from './abstract.js';

const createStatisticsTemplate = (movies) => (
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`
);

export default class FooterStatistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }
}
