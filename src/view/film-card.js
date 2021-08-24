import AbstractView from './abstract.js';
import {changeDateFormatToYear} from '../utils/utils-for-render.js';

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
    this._openClickHandler = this._openClickHandler.bind(this);

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return filmCardTemplate(this._film);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openClickHandler);
  }
}
