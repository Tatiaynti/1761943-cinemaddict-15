import {FilterType, UpdateType} from '../const.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/utils-for-render.js';
import ProfileView from '../view/profile.js';
import FiltersView from '../view/filters.js';
import {filter} from '../utils/utils-common.js';

export default class Filters {
  constructor(headerProfileContainer, filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._headerProfileContainer = headerProfileContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._mainNavigationComponent = null;
    this._headerProfileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevMainNavigationComponent = this._mainNavigationComponent;
    const prevHeaderProfileComponent = this._headerProfileComponent;

    this._mainNavigationComponent = new FiltersView(filters, this._filterModel.getFilter());
    this._headerProfileComponent = new ProfileView(this._getWatchedFilmsCount());
    this._mainNavigationComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevMainNavigationComponent === null && prevHeaderProfileComponent === null) {
      renderElement( this._headerProfileContainer, this._headerProfileComponent, RenderPosition.BEFOREEND);
      renderElement(this._filterContainer, this._mainNavigationComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._mainNavigationComponent, prevMainNavigationComponent);
    replace(this._headerProfileComponent, prevHeaderProfileComponent);
    remove(prevMainNavigationComponent);
    remove(prevHeaderProfileComponent);
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.INIT) {
      this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    }
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  _getWatchedFilmsCount() {
    return this._getFilters().find((filterItem) => filterItem.name === 'History').count;
  }
}
