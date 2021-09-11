import {FilterType} from '../const.js';
import AbstractView from './abstract.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in your watchlist',
  [FilterType.HISTORY]: 'There are no movies in your history',
  [FilterType.FAVORITES]: 'There are no favorite movies',
};

const createEmptyList = (filterType) => {
  const noFilmTextValue = NoFilmsTextType[filterType];
  return (
    `
      <h2 class="films-list__title">${noFilmTextValue}</h2>
    `);
};

export default class EmptyList extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEmptyList(this._data);
  }
}
