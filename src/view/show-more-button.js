import AbstractView from './abstract.js';

const showMoreButtonTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);

export default class ShowMoreButton extends AbstractView {
  constructor () {
    super();
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
  }

  getTemplate() {
    return showMoreButtonTemplate();
  }

  _showMoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.showMoreClick();
  }

  setShowMoreClickHandler(callback) {
    this._callback.showMoreClick = callback;
    this.getElement().addEventListener('click', this._showMoreClickHandler);
  }
}
