import FilmDetailsView from '../view/film-details.js';
import FilmCardView from '../view/film-card.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/utils-for-render.js';
import {Key} from '../data.js';

const bodyElement = document.querySelector('body');

export default class FilmCard {
  constructor(container, changeData) {
    this._filmContainer = container;
    this._changeData = changeData;

    this._filmCard = null;
    this._popup = null;

    this._handleRemovePopup = this._handleRemovePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevPopup = this._popup;

    this._filmCard = new FilmCardView(this._film);
    this._popup = new FilmDetailsView(this._film);

    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCard.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popup.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popup.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._popup.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCard === null || prevPopup === null) {
      this._renderFilmInfo();
      return;
    }

    if (this._filmContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
      this._filmCard.setOpenClickHandler(this._handleOpenPopup);
    }

    if (bodyElement.contains(prevPopup.getElement())) {
      this._handleOpenPopup();
    }

    remove(prevFilmCard);
    remove(prevPopup);
  }

  _renderFilmInfo() {
    this._filmCard.setOpenClickHandler(this._handleOpenPopup);

    renderElement(this._filmContainer, this._filmCard, RenderPosition.BEFOREEND);
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _removeOldPopup() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
  }

  _handleOpenPopup() {
    this._removeOldPopup();
    renderElement(bodyElement, this._popup, RenderPosition.BEFOREEND);

    bodyElement.classList.add('hide-overflow');

    this._popup.setCloseClickHandler(this._handleRemovePopup);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleRemovePopup() {
    remove(this._popup);
    bodyElement.classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._handleRemovePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
