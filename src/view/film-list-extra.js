import AbstractView from './abstract.js';

const filmListExtraTemplate = (title) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
  </section>`
);

export default class FilmListExtra extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return filmListExtraTemplate(this._title);
  }
}
