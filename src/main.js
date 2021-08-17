import ProfileView from './view/profile.js';
import MenuView from './view/menu.js';
import ShowMoreButtonView from './view/show-more-button.js';
import StatisticsView from './view/statistics.js';
import SortView from './view/sort.js';
import {generateFilms} from './mock/film.js';
import {renderElement, RenderPosition} from './utils-common.js';
import {generateFilter} from './view/menu.js';
import FilmsContainerView from './view/film-container.js';
import FilmsListView from './view/film-list.js';
// import FilmListExtraView from './view/film-list-extra.js';
import FilmCardView from './view/film-card.js';
import FilmDetailsView from './view/film-details.js';
import {KEY} from './data.js';

const FILM_CARDS_COUNT = 18;
const FILM_CARDS_PER_STEP = 5;
// const EXTRA_CARDS = 2;

const allFilms = generateFilms(FILM_CARDS_COUNT);
const filters = generateFilter(allFilms);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const bodyElement = document.querySelector('body');

renderElement(headerElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainerView();
const filmsList = new FilmsListView();
// const filmListExtraTop = new FilmListExtraView('Top rated movies');
// const filmListExtraMostCommented = new FilmListExtraView('Most commented');

renderElement(mainElement, filmsContainer.getElement(), RenderPosition.BEFOREEND);
renderElement(filmsContainer.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);
// renderElement(filmsContainer.getElement(), filmListExtraTop.getElement(), RenderPosition.BEFOREEND);
// renderElement(filmsContainer.getElement(), filmListExtraMostCommented.getElement(), RenderPosition.BEFOREEND);

const renderFilmCards = (container, film) => {
  const filmCard = new FilmCardView(film);
  const popup = new FilmDetailsView(film);
  const renderPopup = () => {
    renderElement(bodyElement, popup.getElement(), RenderPosition.BEFOREEND);
    bodyElement.classList.add('hide-overflow');

    const removePopup = () => {
      popup.getElement().remove();
      bodyElement.classList.remove('hide-overflow');
    };
    popup.setCloseClickHandler(removePopup);

    const onEscKeyDown = (evt) => {
      if (evt.key === KEY.ESCAPE || evt.key === KEY.ESC) {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);
  };

  filmCard.setOpenClickHandler(renderPopup);

  renderElement(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};
const minFilms = Math.min(allFilms.length, FILM_CARDS_PER_STEP);

for (let i = 0; i < minFilms; i++) {
  renderFilmCards(filmsList.getElement().querySelector('.films-list__container'), allFilms[i]);
}

if (allFilms.length > FILM_CARDS_PER_STEP) {
  let renderedFilmCount = FILM_CARDS_PER_STEP;
  const showMoreButton = new ShowMoreButtonView();
  renderElement(filmsList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.setLoadMoreClickHandler(() => {
    allFilms
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARDS_PER_STEP)
      .forEach((film) => renderFilmCards(filmsList.getElement().querySelector('.films-list__container'), film));
    renderedFilmCount += FILM_CARDS_PER_STEP;

    if(renderedFilmCount >= allFilms.length) {
      showMoreButton.getElement().remove();
    }
  });
}

renderElement(footerElement, new StatisticsView().getElement(), RenderPosition.AFTEREND);

// const filmExtraListContainer = [...filmsContainer.getElement().querySelectorAll('.films-list--extra')];

// filmExtraListContainer.forEach((item) => {
//   const container = item.querySelector('.films-list__container');
//   renderFilmCards(EXTRA_CARDS, container);
// });
