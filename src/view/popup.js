import SmartView from './smart.js';
import {formatReleaseDate, generateRuntime} from '../utils/utils-common.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import he from 'he';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const createGenreItemTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;
const createGenresTemplate = (genres) => genres
  .map((genre) => createGenreItemTemplate(genre))
  .join('');

const createInputEmojiTamplate = (emotion, checkedEmotion) => `<input class="film-details__emoji-item visually-hidden"
name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}"
${checkedEmotion === emotion ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" alt="emoji" width="30" height="30">
      </label>`;

const createEmojiListTemplate = (emotions, checkedEmotion) => emotions
  .map((emotion) => createInputEmojiTamplate(emotion, checkedEmotion))
  .join('');

const createCommentTemplate = (comments) => {
  const {emotion, comment, author, date, id} = comments;

  return `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${emotion}.png" alt="emoji-${emotion}" width="55" height="55">
</span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author ? author : ''}</span>
      <span class="film-details__comment-day">${date ? dayjs(date).fromNow() : ''}</span>
      <button class="film-details__comment-delete" data-id="${id}">Delete</button>
    </p>
  </div>
</li>`;
};

const createCommentsTemplate = (comments) => comments
  .map((comment) => createCommentTemplate(comment))
  .join('');

const createFilmPopupTemplate = (data, comments) => {
  const {title, altTitle, rating, poster, ageRating, director, writers, actors, releaseDate, runtime, releaseCountry, description, genres, isInWatchlist, isWatched, isFavorite,
    textComment, checkedEmotion} = data;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${altTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(releaseDate, 'DD MMMM YYYY')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${generateRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${(createGenresTemplate(genres))}</td>
                </tr>
              </tbody></table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isInWatchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>
    <div class="film-details__bottom-container">
     ${comments !== null ? `<section class="film-details__comments-wrap">
     ${comments.length ? `
     <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}
     </span></h3>` : ''}
     <ul class="film-details__comments-list">
     ${createCommentsTemplate(comments)}
   </ul>
<div class="film-details__new-comment">
<div class="film-details__add-emoji-label">
${checkedEmotion ? `<img src="./images/emoji/${checkedEmotion}.png"
alt="emoji-${checkedEmotion}" width="55" height="55">` : ''}
</div>
<label class="film-details__comment-label">
 <textarea class="film-details__comment-input"
 placeholder="Select reaction below and write comment here"
 name="comment">${textComment ? textComment : ''}</textarea>
</label>
<div class="film-details__emoji-list">
${createEmojiListTemplate(EMOTIONS, checkedEmotion)}
     </div>
   </div>
 </section>` : `<h3 class="film-details__comments-title">${'Возникла ошибка при загрузке комментариев'}</h3>`}
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film, comments) {
    super();
    this._data = FilmPopup.parseMovieToData(film);
    this._comments = comments;
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickMarkAsWatchedlistHandler = this._clickMarkAsWatchedlistHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);

    this._textTextareaHandler = this._textTextareaHandler.bind(this);
    this._emotionInputHandler = this._emotionInputHandler.bind(this);
    this._scrollPopupHandler = this._scrollPopupHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data, this._comments);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _clickAddToWatchlistHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick(this._data);
  }

  _clickMarkAsWatchedlistHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatchedlistClick(this._data);
  }

  _clickFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._data);
  }

  _textTextareaHandler(evt) {
    evt.preventDefault();
    this.updateData({
      textComment: he.escape(evt.target.value),
    }, true);
  }

  getScrollPosition() {
    return this._data.scrollPosition;
  }

  _emotionInputHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.updateData({
      checkedEmotion: evt.target.value,
    });
    this.getElement().scrollTo(0, this._data.scrollPosition);
  }

  _scrollPopupHandler(evt) {
    this.updateData({
      scrollPosition: evt.target.scrollTop,
    }, true);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(+evt.target.dataset.id, this._data, evt.target);
  }

  _commentSubmitHandler(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      evt.preventDefault();
      this._callback.commentSubmit(this._data);
      document.removeEventListener('keydown', this._commentSubmitHandler);
    }
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._clickAddToWatchlistHandler);
  }

  setMarkAsWatchedlistClickHandler(callback) {
    this._callback.markAsWatchedlistClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._clickMarkAsWatchedlistHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._clickFavoriteHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((deleteButton) => deleteButton.addEventListener('click', this._commentDeleteClickHandler));
  }

  setSubmitCommentHandler(callback) {
    this._callback.commentSubmit = callback;
    document.addEventListener('keydown', this._commentSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setPresenterHandlers();
  }

  _setInnerHandlers() {
    if (this.getElement()
      .querySelector('.film-details__comment-input')) {
      this.getElement()
        .querySelector('.film-details__comment-input')
        .addEventListener('input', this._textTextareaHandler);
      this.getElement()
        .querySelector('.film-details__emoji-list')
        .addEventListener('click', this._emotionInputHandler);
    }

    this.getElement()
      .addEventListener('scroll', this._scrollPopupHandler);
  }

  _setPresenterHandlers() {
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setMarkAsWatchedlistClickHandler(this._callback.markAsWatchedlistClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteCommentClickHandler(this._callback.deleteClick);
    this.setSubmitCommentHandler(this._callback.commentSubmit);
  }

  static parseMovieToData(movie) {
    return Object.assign(
      {},
      movie,
      {
        scrollPosition: 0,
      },
    );
  }
}
