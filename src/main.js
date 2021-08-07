import {profileTemplate} from './view/profile.js';
import {filmCardTemplate} from './view/film-card.js';
import {menuListTemplate} from './view/menu.js';
import {filmListTemplate} from './view/film-list.js';
import {filmListExtraTemplate} from './view/film-list-extra.js';
import {showMoreButtonTemplate} from './view/show-more-button.js';
import {statisticsTemplate} from './view/stats.js';
import {generateFilms} from './mock/film.js';
// import {filmDetailsTemplate} from './view/film-details.js';

const FILM_CARDS_COUNT = 18;
const EXTRA_CARDS = 2;
const FILM_CARDS_PER_STEP = 5;

const allFilms = generateFilms(FILM_CARDS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const renderFilmCards = (cardsCount, container) => {
  for (let i = 0; i < cardsCount; i++) {
    render(container, filmCardTemplate(allFilms[i]), 'beforeend');
  }
};
const minFilms = Math.min(allFilms.length, FILM_CARDS_PER_STEP);

render(headerElement, profileTemplate(), 'beforeend');
render(mainElement, menuListTemplate(allFilms), 'beforeend');
render(mainElement, filmListTemplate(), 'beforeend');

const filmsContainer = mainElement.querySelector('.films');
render(filmsContainer, filmListExtraTemplate('Top rated movies'), 'beforeend');
render(filmsContainer, filmListExtraTemplate('Most commented'), 'beforeend');

const filmListContainer = mainElement.querySelector('.films-list__container');
renderFilmCards(minFilms, filmListContainer);

const filmListElement = mainElement.querySelector('.films-list');

if (allFilms.length > FILM_CARDS_PER_STEP) {
  let renderedFilmCount = FILM_CARDS_PER_STEP;

  render(filmListElement, showMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmListElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    allFilms
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARDS_PER_STEP)
      .forEach((film) => render(filmListContainer, filmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_CARDS_PER_STEP;

    if(renderedFilmCount >= allFilms.length) {
      showMoreButton.remove();
    }
  });
}

const filmExtraListContainer = [...filmsContainer.querySelectorAll('.films-list--extra')];

filmExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  renderFilmCards(EXTRA_CARDS, container);
});

render(footerElement, statisticsTemplate(), 'afterend');

// render(footerElement, filmDetailsTemplate(allFilms[0]), 'afterend');
