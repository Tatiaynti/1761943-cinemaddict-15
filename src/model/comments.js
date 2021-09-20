import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._commentsList = [];
  }

  setComments(commentsList) {
    if (commentsList === null) {
      this._commentsList = commentsList;
    }
    this._commentsList = commentsList.slice();
  }

  getComments() {
    return this._commentsList;
  }

  addComment(update) {
    this._commentsList = [
      ...this._commentsList,
      update,
    ];
  }
}
