import AbstractView from './abstract.js';
import { changeDateFormatToYear } from './utils-for-view.js';

const filmCardTemplate = (film) => {
  const {title, rating, release, runtime, genres, description, poster, comments, isFavorite, isInWatchlist, isWatched} = film;
  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';
  const watchlistClassName = isInWatchlist
    ? 'film-card__controls-item--active'
    : '';
  const watchedClassName = isWatched
    ? 'film-card__controls-item--active'
    : '';

  return `
  <article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${changeDateFormatToYear(release)}</span>
      <span class="film-card__duration">${runtime.runtimeHours}h ${runtime.runtimeMins}m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchedClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchlistClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>
`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return filmCardTemplate(this._film);
  }
}
