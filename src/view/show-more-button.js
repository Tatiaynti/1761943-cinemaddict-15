import AbstractView from './abstract.js';

const showMoreButtonTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);

export default class ShowMoreButton extends AbstractView {
  constructor () {
    super();
    this._loadMoreClickHandler = this._loadMoreClickHandler.bind(this);
  }

  getTemplate() {
    return showMoreButtonTemplate();
  }

  _loadMoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.loadClick();
  }

  setLoadMoreClickHandler(callback) {
    this._callback.loadClick = callback;
    this.getElement().addEventListener('click', this._loadMoreClickHandler);
  }
}
