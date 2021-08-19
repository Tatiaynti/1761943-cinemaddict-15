import AbstractView from './abstract.js';

const countFilters = (accumulator, film) => ({
  watchlist: film.isInWatchlist ? ++accumulator.watchlist : accumulator.watchlist,
  history: film.isWatched ? ++accumulator.history : accumulator.history,
  favorites: film.isFavorite ? ++accumulator.favorites : accumulator.favorites,
});

export const generateFilter = (films) => (
  films.reduce(countFilters, {
    watchlist: 0,
    history: 0,
    favorites: 0,
  })
);

const menuListTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters.watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters.history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters.favorites}</span></a>
    </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class Menu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return menuListTemplate(this._filters);
  }
}
