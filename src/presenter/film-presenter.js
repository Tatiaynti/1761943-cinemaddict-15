import FilmsContainerView from '../view/film-container.js';
import FilmsListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
// import ProfileView from './view/profile.js';
// import StatisticsView from './view/statistics.js';

import EmptyListView from '../view/no-films.js';
import {renderElement, RenderPosition} from '../utils/utils-for-render.js';
import {Key} from '../data.js';
import FilmDetailsView from '../view/film-details.js';
import FilmCardView from '../view/film-card.js';
import MenuView from '../view/menu.js';

const FILM_CARDS_PER_STEP = 5;
const bodyElement = document.querySelector('body');

export default class Films {
  constructor(containerFilmsList) {
    this._container = containerFilmsList;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._sortComponent = new SortView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new EmptyListView();
    this._menuComponent = new MenuView();
  }

  init(allFilms) {
    this._allFilms = allFilms.slice();

    renderElement(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    renderElement(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _renderSort() {
    renderElement(this._filmsContainerComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film) {
    const filmCard = new FilmCardView(film);
    const popup = new FilmDetailsView(film);
    const renderPopup = () => {
      renderElement(bodyElement, popup, RenderPosition.BEFOREEND);
      bodyElement.classList.add('hide-overflow');

      const removePopup = () => {
        popup.getElement().remove();
        bodyElement.classList.remove('hide-overflow');
      };
      popup.setCloseClickHandler(removePopup);

      const onEscKeyDown = (evt) => {
        if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
          evt.preventDefault();
          removePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };
      document.addEventListener('keydown', onEscKeyDown);
    };

    filmCard.setOpenClickHandler(renderPopup);

    renderElement(this._filmsListComponent.getElement().querySelector('.films-list__container'), filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._allFilms
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    renderElement(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    let renderedFilmCount = FILM_CARDS_PER_STEP;
    const showMoreButton = new ShowMoreButtonView();
    renderElement(this._filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setLoadMoreClickHandler(() => {
      this._allFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_CARDS_PER_STEP)
        .forEach((film) => this._renderFilmCard(film));
      renderedFilmCount += FILM_CARDS_PER_STEP;

      if(renderedFilmCount >= this._allFilms.length) {
        showMoreButton.getElement().remove();
      }
    });
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._allFilms.length, FILM_CARDS_PER_STEP));

    if (this._allFilms.length > FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (this._allFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilmsList();
  }
}
