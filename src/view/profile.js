import AbstractView from './abstract.js';
import {createProfileRating} from '../utils/utils-common.js';

const createProfileTemplate = (watchedMovies) => (
  `<section class="header__profile profile">
  <p class="profile__rating">${createProfileRating(watchedMovies)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
);

export default class Profile extends AbstractView {
  constructor(watchedMovies) {
    super();
    this._watchedMovies = watchedMovies;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedMovies);
  }
}
