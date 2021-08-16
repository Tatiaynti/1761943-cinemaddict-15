import {createElement} from '../utils-common.js';

const filmFiltersMap = {
  favorites: (films) => films.filter((film) => film.isFavorite).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  inWatchlist: (films) => films.filter((film) => film.isInWatchlist).length,
};

export const generateFilter = (films) => Object.entries(filmFiltersMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);

const menuListTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters[2].count}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters[1].count}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters[0].count}</span></a>
    </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return menuListTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
