import FilmPopupView from '../view/popup.js';
import FilmCardView from '../view/film-card.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/utils-for-render.js';
import CommentsModel from '../model/comments.js';
import {Key, Mode, UpdateType, UserAction, FilterType} from '../const.js';

const bodyElement = document.querySelector('body');

export default class FilmCard {
  constructor(container, changeData, changeMode, filterType, api) {
    this._filmContainer = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filterType = filterType;
    this._api = api;

    this._filmCard = null;
    this._popup = null;

    this._mode = Mode.CLOSED;

    this._handleRemovePopup = this._handleRemovePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._commentsModel = new CommentsModel();
  }

  init(film) {
    this._film = film;
    this._api.getСomments(this._film).then((comments) => {
      if (this._film.comments) {
        this._commentsModel.setComments(comments);
      }
    });

    const prevFilmCard = this._filmCard;

    this._filmCard = new FilmCardView(film);
    this._filmCard.setOpenClickHandler(() => this._renderPopup(film, this._commentsModel.getComments()));
    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCard.setIsWatchedClickHandler(this._handleIsWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCard === null) {
      renderElement(this._filmContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._handleRemovePopup();
    }
  }

  destroy() {
    remove(this._filmCard);
  }

  _renderPopup(film) {
    if (this._popup) {
      this._handleRemovePopup();
    }

    if (this._popup !== null) {
      this._scrollPosition = this._popup.getScrollPosition();
      this._popup = null;
    }
    this._popup = new FilmPopupView(film, this._commentsModel.getComments());
    this._openPopup();
    this._popup.getElement().scrollTo(0, this._scrollPosition);

    bodyElement.classList.add('hide-overflow');

    this._popup.setCloseBtnClickHandler(this._handleRemovePopup);
    this._popup.setAddToWatchlistClickHandler(this._handleWatchlistClick);
    this._popup.setMarkAsWatchedClickHandler(this._handleIsWatchedClick);
    this._popup.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popup.setDeleteCommentClickHandler(this._handleDeleteComment);
    this._popup.setSubmitCommentHandler(this._handleCommentSubmit);
  }

  _openPopup() {
    renderElement(bodyElement, this._popup, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.OPEN;
  }

  rerenderPopup() {
    if (this._popup) {
      this._renderPopup(this._film, this._commentsModel.getComments());
      this._popup.getElement().scrollTo(0, this._scrollPosition);
    }
  }

  updateCommentList() {
    this._api.getСomments(this._film).then((comments) => {
      this._commentsModel.setComments(comments);
      this._renderPopup(this._film, this._commentsModel.getComments());
      this._popup.getElement().scrollTo(0, this._scrollPosition);
    });
  }

  errorShake() {
    if (this._popup) {
      this._popup.shake();
    } else {
      this._filmCard.shake();
    }
  }

  _handleWatchlistClick() {
    if (this._popup) {
      this._scrollPosition = this._popup.getScrollPosition();
    }
    const isCurrentFilterType = this._filterType === this._filterType === FilterType.ALL ||
    this._filterType !== FilterType.WATCHLIST;
    if (!isCurrentFilterType && this._popup) {
      this._handleRemovePopup();
    }
    this._changeData(
      UserAction.UPDATE_FILM,
      isCurrentFilterType ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
      () => {
        if (this._popup) {
          this._renderPopup(this._film, this._commentsModel.getComments());
          this._popup.getElement().scrollTo(0, this._scrollPosition);
        }
      },
      () => {
        if (this._popup) {
          this._popup.shake();
        } else {
          this._filmCard.shake();
        }
      },
    );
  }

  _handleIsWatchedClick() {
    if (this._popup) {
      this._scrollPosition = this._popup.getScrollPosition();
    }
    const isCurrentFilterType = this._filterType === FilterType.ALL || this._filterType !== FilterType.HISTORY;
    const isWatched = this._film.isWatched;
    if (!isCurrentFilterType && this._popup) {
      this._handleRemovePopup();
    }
    this._changeData(
      UserAction.UPDATE_FILM,
      isCurrentFilterType ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
          watchingDate: isWatched ? null : new Date(),
        },
      ),
      () => {
        if (this._popup) {
          this._renderPopup(this._film, this._commentsModel.getComments());
          this._popup.getElement().scrollTo(0, this._scrollPosition);
        }
      },
      () => {
        if (this._popup) {
          this._popup.shake();
        } else {
          this._filmCard.shake();
        }
      },
    );
  }

  _handleFavoriteClick() {
    if (this._popup) {
      this._scrollPosition = this._popup.getScrollPosition();
    }
    const isCurrentFilterType = this._filterType === FilterType.ALL || this._filterType !== FilterType.FAVORITES;
    if (!isCurrentFilterType && this._popup) {
      this._handleRemovePopup();
    }
    this._changeData(
      UserAction.UPDATE_FILM,
      isCurrentFilterType ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
      () => {
        if (this._popup) {
          this._renderPopup(this._film, this._commentsModel.getComments());
          this._popup.getElement().scrollTo(0, this._scrollPosition);
        }
      },
      () => {
        if (this._popup) {
          this._popup.shake();
        } else {
          this._filmCard.shake();
        }
      },
    );
  }

  _handleDeleteComment(id, currentButton, buttons) {
    if (this._popup) {
      this._scrollPosition = this._popup.getScrollPosition();
    }

    currentButton.textContent = 'Deleting...';
    buttons.forEach((button) => button.disabled = true);
    this._api.deleteComment(id).then(() => {
      this._changeData(
        UserAction.UPDATE_FILM_POPUP,
        UpdateType.PATCH,
        this._film,
      );
    }).catch(() => {
      this._popup.shake();
      currentButton.textContent = 'Delete';
      buttons.forEach((button) => button.disabled = false);
    });
  }

  _handleCommentSubmit(data, textArea, emojiInputs) {
    if (this._popup) {
      this._scrollPosition = this._popup.getScrollPosition();
    }

    const newComment = {
      emotion: data.checkedEmotion,
      comment: data.textComment,
    };

    textArea.setAttribute('disabled', 'disabled');
    emojiInputs.forEach((input) => input.disabled = true);

    this._api.addComment(this._film, newComment).then((response) => {
      this._commentsModel.addComment(response.comments);
    })
      .then(() => {
        this._changeData(
          UserAction.UPDATE_FILM_POPUP,
          UpdateType.PATCH,
          this._film,
        );
      })
      .catch(() => {
        textArea.removeAttribute('disabled');
        emojiInputs.forEach((input) => input.disabled = false);
        this._popup.shake();
      });
  }

  _handleRemovePopup() {
    remove(this._popup);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._handleRemovePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
