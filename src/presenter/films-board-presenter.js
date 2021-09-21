import FilmsListSectionView from '../view/films-list-section.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListContainerView from '../view/films-list-container.js';

import SortView from '../view/sort.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmsListEmptyView from '../view/no-films.js';
import LoadingElementView from '../view/loading.js';
import FullStatisticsView from '../view/full-statistics.js';
import FilmPresenter from './film-presenter.js';
import {filter, sortByRating, sortByDate, filterStatsByWatchingDate, createProfileRating} from '../utils/utils-common.js';
import {SortType, UpdateType, UserAction, FilterType, Screens, StatsFilterType} from '../const.js';
import {remove, renderElement, RenderPosition} from '../utils/utils-for-render.js';

const FILM_CARDS_PER_STEP = 5;

export default class FilmsPresenter {
  constructor(pageContainer, filmsModel, filtersModel, api) {
    this._container = pageContainer;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._api =  api;

    this._filmsContainer = new FilmsContainerView();
    this._filmsListSection = new FilmsListSectionView();
    this._filmsListContainer = new FilmsListContainerView();
    this._loadingComponent = new LoadingElementView();
    this._filterType = FilterType.ALL;
    this._renderedFilmCount = FILM_CARDS_PER_STEP;
    this._filmsPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._currentScreen = Screens.MOVIES;
    this._currentStatsFilter = StatsFilterType.ALL;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleStatsFilterTypeChange = this._handleStatsFilterTypeChange.bind(this);
  }

  init() {
    this._renderFilmsContainer();
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    this._filterType = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    this._currentProfileRating = createProfileRating(filter[FilterType.HISTORY](films).length);
    if (this._filterType === FilterType.STATS) {
      this._currentScreen = Screens.STATS;
      return filtredFilms;
    }
    this._currentScreen = Screens.MOVIES;
    switch (this._currentSortType) {
      case SortType.RATING:
        return sortByRating(filtredFilms.slice());
      case SortType.DATE:
        return sortByDate(filtredFilms.slice());
    }
    return filtredFilms;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmsCount: true});
    this._renderFilmsContainer();
  }

  _handleModeChange() {
    this._filmsPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateMovie(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        })
          .then(() => {
            this._updatePopupFilmCardPresenter(this._filmsPresenter, update);
          })
          .catch(() => {
            this._shakeFilmCardPresenter(this._filmsPresenter, update);
          });
        break;
      case UserAction.UPDATE_FILM_POPUP:
        this._api.updateMovie(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        })
          .then(() => {
            this._updateCommentFilmCardPresenter(this._filmsPresenter, update);
          });
        break;
    }
  }

  _updatePopupFilmCardPresenter (presentersMap, data) {
    if (presentersMap.has(data.id)) {
      return presentersMap.get(data.id).rerenderPopup();
    }
  }

  _updateCommentFilmCardPresenter (presentersMap, data) {
    if (presentersMap.has(data.id)) {
      return presentersMap.get(data.id).updateCommentList();
    }
  }

  _shakeFilmCardPresenter(presentersMap, data) {
    if (presentersMap.has(data.id)) {
      return presentersMap.get(data.id).errorShake();
    }
  }

  _initFilmCardPresenter(presentersMap, data) {
    if (presentersMap.has(data.id)) {
      presentersMap.get(data.id).init(data, data.comments);
    }
  }

  _handleModelEvent(updateType, data) {
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[FilterType.HISTORY](films);
    switch (updateType) {
      case UpdateType.PATCH:
        this._initFilmCardPresenter(this._filmsPresenter, data);
        break;
      case UpdateType.MINOR:
        this._clearBoard({resetRenderedFilmsCount: true});
        this._renderFilmsContainer();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        switch (this._currentScreen) {
          case Screens.MOVIES: this._renderFilmsContainer();
            break;
          case Screens.STATS:
            this._currentStatsFilter = StatsFilterType.ALL;
            this._renderStats(filtredFilms);
            break;
        }
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderFilmsContainer();
        break;
    }
  }

  _renderStats(films) {
    this._statsComponent = new FullStatisticsView(this._currentProfileRating, this._currentStatsFilter, films);
    this._statsComponent.setStatsClickHandler(this._handleStatsFilterTypeChange);
    renderElement(this._container, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _handleStatsFilterTypeChange(value) {
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[FilterType.HISTORY](films);
    this._currentStatsFilter = value;
    remove(this._statsComponent);

    switch (this._currentStatsFilter) {
      case StatsFilterType.ALL:
        this._renderStats(filtredFilms);
        break;
      case StatsFilterType.TODAY:
        this._renderStats(filterStatsByWatchingDate(filtredFilms, 'd'));
        break;
      case StatsFilterType.WEEK:
        this._renderStats(filterStatsByWatchingDate(filtredFilms, 'w'));
        break;
      case StatsFilterType.MONTH:
        this._renderStats(filterStatsByWatchingDate(filtredFilms, 'M'));
        break;
      case StatsFilterType.YEAR:
        this._renderStats(filterStatsByWatchingDate(filtredFilms, 'y'));
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);

    if (this._getFilms().length) {
      renderElement(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderFilmCard(containerElement, film, filmList) {
    const filmPresenter =
    new FilmPresenter(containerElement, this._handleViewAction, this._handleModeChange, this._filterType, this._api);
    filmList.set(film.id, filmPresenter);
    filmPresenter.init(film, film.comments);
  }

  _renderFilmCards(container, films, filmList) {
    films
      .forEach((film) => this._renderFilmCard(container, film, filmList));
  }

  _renderFilmListEmpty() {
    remove(this._filmsListSection);
    this._filmListEmptyComponent = new FilmsListEmptyView(this._filterType);
    renderElement(this._filmsContainer, this._filmListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmCount + FILM_CARDS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmsCount);
    this._renderFilmCards(this._filmsListContainer, films, this._filmsPresenter);
    this._renderedFilmCount = newRenderedFilmsCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }
    this._showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(this._filmsListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, FILM_CARDS_PER_STEP));
    if (!films.length) {
      this._renderFilmListEmpty();
      return;
    }
    renderElement(this._filmsContainer, this._filmsListSection, RenderPosition.AFTERBEGIN);
    this._renderFilmsListContainer(this._filmsListSection, this._filmsListContainer);

    this._renderFilmCards(this._filmsListContainer, films, this._filmsPresenter);

    if (filmsCount > FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearMapPresenter(mapPresenter) {
    mapPresenter.forEach((presenter) => presenter.destroy());
    mapPresenter.clear();
  }

  _clearBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;

    this._clearMapPresenter(this._filmsPresenter);

    if (this._statsComponent) {
      remove(this._statsComponent);
    }
    remove(this._sortComponent);
    if (this._filmListEmptyComponent) {
      remove(this._filmListEmptyComponent);
    }
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);
    remove(this._filmsListSection);

    if (resetRenderedFilmsCount) {
      this._renderedFilmCount = FILM_CARDS_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmsListContainer(container, component) {
    renderElement(container, component, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderElement(this._filmsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsContainer() {
    if (this._isLoading) {
      renderElement(this._container, this._filmsContainer, RenderPosition.BEFOREEND);
      this._renderLoading();
      return;
    }
    this._renderSort();
    renderElement(this._container, this._filmsContainer, RenderPosition.BEFOREEND);
    this._renderFilmList();
  }
}
