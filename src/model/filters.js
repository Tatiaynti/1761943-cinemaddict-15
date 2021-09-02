import AbstractObserver from '../utils/abstract-observer.js';

export default class Filters extends AbstractObserver {
  constructor() {
    super();
    this._filters = [];
  }

  setFilters(filters) {
    this._filters = filters.slice();
  }

  getFilters() {
    return this._filters;
  }
}
