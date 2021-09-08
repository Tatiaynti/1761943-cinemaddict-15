import FilmPopupView from '../view/popup.js';
import FilmCardView from '../view/film-card.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/utils-for-render.js';
import {Key, UpdateType, UserAction} from '../const.js';
import PopupCommentsView from '../view/popup-comments.js';

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
    this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevPopup = this._popup;

    this._filmCard = new FilmCardView(this._film);
    this._popup = new FilmPopupView(this._film);
    this._popupComments = new PopupCommentsView(this._film);

    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCard.setIsWatchedClickHandler(this._handleIsWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popup.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popup.setIsWatchedClickHandler(this._handleIsWatchedClick);
    this._popup.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComments.setDeleteClickHandler(this._handleDeleteComment);


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

  destroy() {
    remove(this._filmCard);
    remove(this._popup);
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleIsWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleDeleteComment(id) {
    const commentDel = this._film.comments.find((comment) => comment.id === id);
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this._film, comments: commentDel},
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
    renderElement(this._popup.getElement().querySelector('.film-details__bottom-container'), this._popupComments, RenderPosition.BEFOREEND);

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
