import FilmsContainerView from '../view/film-container.js';
import FilmsListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import EmptyListView from '../view/no-films.js';
import {remove, renderElement, RenderPosition, updateItem} from '../utils/utils-for-render.js';
import FilmCardPresenter from './film-presenter.js';
import MenuView from '../view/menu.js';

const FILM_CARDS_PER_STEP = 5;

export default class FilmsPresenter {
  constructor(pageContainer, filters) {
    this._container = pageContainer;
    this._filters = filters;

    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    this._filmsPresenter = new Map();

    this._noFilmsComponent = new EmptyListView();
    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._menuComponent = new MenuView(this._filters);
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films.slice();

    this._renderMenu();
    this._renderSort();

    renderElement(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _renderSort() {
    renderElement(this._filmsContainerComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmsPresenter.get(updatedFilm.id).init(updatedFilm);
    this._renderMenu();
  }

  _renderMenu() {
    renderElement(this._container, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListContainer() {
    renderElement(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    renderElement(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(this._filmsListComponent.getElement().querySelector('.films-list__container'), film));
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmCardPresenter(container, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmsPresenter.set(film.id, filmPresenter);
  }

  _handleShowMoreClick() {
    this._films
      .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP)
      .forEach((film) => this._renderFilmCard(this._filmsListComponent.getElement().querySelector('.films-list__container'), film));

    this._renderedFilmsCount += FILM_CARDS_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_CARDS_PER_STEP));

    if (this._films.length > FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsListContainer();
    this._renderFilmsList();
  }
}
