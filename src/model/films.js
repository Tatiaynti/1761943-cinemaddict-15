import AbstractObserver from '../utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(filmsList) {
    this._films = filmsList.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    if (indexFilm === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    const newComment = update.comments;
    this._films[indexFilm].comments = [...this._films[indexFilm].comments, newComment];
    this._notify(updateType, this._films[indexFilm]);
  }

  deleteComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    const indexComment = this._films[indexFilm].comments.findIndex((comment) => comment.id === update.comments.id);
    if (indexComment === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this._films[indexFilm].comments = [
      ...this._films[indexFilm].comments.slice(0, indexComment),
      ...this._films[indexFilm].comments.slice(indexComment + 1),
    ];
    this._notify(updateType, this._films[indexFilm]);
  }
}
