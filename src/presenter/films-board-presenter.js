import FilmsContainerView from '../view/film-container.js';
import FilmsListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import EmptyListView from '../view/no-films.js';
import {remove, renderElement, RenderPosition, sortByDate, sortByRaing} from '../utils/utils-for-render.js';
import FilmCardPresenter from './film-presenter.js';
import FiltersView, {generateFilter} from '../view/filters.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const FILM_CARDS_PER_STEP = 5;

export default class FilmsPresenter {
  constructor(pageContainer, filmsModel, filtersModel) {
    this._container = pageContainer;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;

    this._renderedFilmCount = FILM_CARDS_PER_STEP;
    this._filmsPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._noFilmsComponent = new EmptyListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    // this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    // this._films = films.slice();
    // this._sourcedFilms = this._films.slice();
    this._filtersModel = generateFilter(this._filmsModel.getFilms());

    this._filtersComponent = new FiltersView(this._filtersModel);
    this._renderFilters();

    renderElement(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRaing);
    }

    return this._filmsModel.getFilms();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._container.querySelector('.main-navigation'), this._sortComponent, RenderPosition.AFTEREND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderFilmsBoard();
  }

  // _sortFilms(sortType) {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this._films.sort(sortByDate);
  //       break;
  //     case SortType.RATING:
  //       this._films.sort(sortByRaing);
  //       break;
  //     default:
  //       this._films = this._sourcedFilms.slice();
  //   }

  //   this._currentSortType = sortType;
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
    }
  }

  // _handleFilmChange(updatedFilm) {
  //   // this._films = updateItem(this._films, updatedFilm);
  //   // this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);

  //   this._filmsPresenter.get(updatedFilm.id).init(updatedFilm);
  //   this._renderUpdatedFilters();
  // }
  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmsPresenter.forEach((presenter) => presenter.destroy());
    this._filmsPresenter.clear();

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._filmsListComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_CARDS_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  // _clearFilmsList() {
  //   remove(this._sortComponent);
  //   remove(this._filmsListComponent);
  //   remove(this._showMoreButtonComponent);
  //   this._renderedFilmsCount = FILM_CARDS_PER_STEP;
  //   this._filmsPresenter.clear();
  // }

  _renderFilters() {
    renderElement(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  // _renderUpdatedFilters() {
  //   remove(this._sortComponent);
  //   remove(this._filtersComponent);
  //   this._filtersModel = generateFilter(this._filmsModel.getFilms());
  //   this._filtersComponent = new FiltersView(this._filtersModel);
  //   renderElement(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
  //   this._renderSort();

  //   renderElement(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  // }

  _renderFilmsListContainer() {
    renderElement(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    renderElement(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  // _renderFilms(from, to) {
  //   this._films
  //     .slice(from, to)
  //     .forEach((film) => this._renderFilmCard(this._filmsListComponent.getElement().querySelector('.films-list__container'), film));
  // }
  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(this._filmsListComponent.getElement().querySelector('.films-list__container'), film));
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmCardPresenter(container, this._handleViewAction);
    filmPresenter.init(film);
    this._filmsPresenter.set(film.id, filmPresenter);
  }

  _handleShowMoreClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_CARDS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }

    // this._films
    //   .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP)
    //   .forEach((film) => this._renderFilmCard(this._filmsListComponent.getElement().querySelector('.films-list__container'), film));

    // this._renderedFilmsCount += FILM_CARDS_PER_STEP;

    // if (this._renderedFilmsCount >= this._films.length) {
    //   remove(this._showMoreButtonComponent);
    // }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreClick);

    renderElement(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

  }

  _renderFilmsList() {
    // this._renderFilms(0, Math.min(this._films.length, FILM_CARDS_PER_STEP));

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_CARDS_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsListContainer();
    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));
    // this._renderFilmsList();

    if (filmsCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}
