import FilmsContainerView from '../view/film-container.js';
import FilmsListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import ProfileView from './view/profile.js';
import MenuView from './view/menu.js';
import StatisticsView from './view/statistics.js';
import FilmCardView from './view/film-card.js';
import EmptyListView from '../view/no-films.js';

const FILM_CARDS_PER_STEP = 5;

export default class Films {
  constructor(containerFilmsList) {
    this._container = containerFilmsList;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._sortComponent = new SortView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new EmptyListView();
  }

  init(films) {
    this._films = films.slice();

  }

  _renderSort() {

  }

  _renderFilmCard() {

  }

  _renderFilms() {

  }

  _renderNoFilms() {

  }

  _renderShowMoreButton() {

  }

  _renderFilmsList() {
    
  }
}
