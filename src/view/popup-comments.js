import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {changeDateFormatForComments} from '../utils/utils-for-render.js';
import SmartView from './smart.js';

const commentsTemplate = (comments) => (
  comments.map((comment) => {
    const {id, text, emoji, author, date} = comment;
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" data-comment-id=${id}>Delete</button>
      </p>
    </div>
  </li>`;
  }).join('\n')
);

const commentsContainerTemplate = (film, newComment) => {
  const {comments} = film;
  return `
  <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${commentsTemplate(comments)}
        </ul>
        <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">${newComment.emoji ? `<img src="images/emoji/${newComment.emoji}.png" width="55" height="55" alt="emoji-${newComment.emoji}"></img>` : '' }</div>
        <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.text ? newComment.text : ''}</textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
`;
};

export default class PopupComments extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._emojiButtonHandler = this._emojiButtonHandler.bind(this);
    this._commentTextHandler = this._commentTextHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this.setCommentSubmitHandler();
  }

  getTemplate() {
    return commentsContainerTemplate(this._film, this._data);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('input', this._emojiButtonHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentTextHandler);
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((deleteButton) => deleteButton.addEventListener('click', this._commentDeleteClickHandler));

  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCommentSubmitHandler();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  static parseDataToComment(film, data) {
    data = Object.assign(
      {},
      data,
      {
        date: changeDateFormatForComments(dayjs()),
        author: 'Movie Buff',
        id: nanoid(),
      },
    );

    film.comments ? film.comments.push(data) : data;

    return film;
  }

  _emojiButtonHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value,
    });
  }

  _commentTextHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value,
    }, true);
  }

  _commentSubmitHandler(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey) {

      if (!this._data.emoji || !this._data.text) {
        return;
      }

      evt.preventDefault();
      this._film = PopupComments.parseDataToComment(this._film, this._data);
      this._data = {};
      this.updateElement();
      this._scrollDown();
    }
  }

  setCommentSubmitHandler() {
    this.getElement().addEventListener('keydown', this._commentSubmitHandler);
  }

  _scrollDown() {
    const popup = document.querySelector('.film-details');
    popup.scrollTo({
      left: 0,
      top: popup.scrollHeight,
      behavior: 'smooth',
    });
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    const id = evt.target.dataset.commentId;
    this._callback.deleteClick(id);
    this._scrollDown();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((deleteButton) => deleteButton.addEventListener('click', this._commentDeleteClickHandler));
  }
}
