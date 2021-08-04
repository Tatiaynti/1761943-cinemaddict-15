import {profileTemplate} from './view/profile.js';
import {filmCardTemplate} from './view/film-card.js';
import {menuListTemplate} from './view/menu.js';
import {filmListTemplate} from './view/film-list.js';
import {filmListExtraTemplate} from './view/film-list-extra.js';
import {showMoreButtonTemplate} from './view/show-more-button.js';
import {films} from './mock/film.js';
import { statisticsTemplate } from './view/stats.js';
// import {filmDetailsTemplate} from './view/film-details.js';
// import { generatePopup } from './mock/popup.js';

const EXTRA_CARDS = 2;
const FILM_CARDS_PER_STEP = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const renderFilmCards = (cardsCount, container) => {
  for (let i = 0; i < cardsCount; i++) {
    render(container, filmCardTemplate(films[i]), 'beforeend');
  }
};
const minFilms = Math.min(films.length, FILM_CARDS_PER_STEP);

render(headerElement, profileTemplate(), 'beforeend');
render(mainElement, menuListTemplate(), 'beforeend');
render(mainElement, filmListTemplate(), 'beforeend');

const filmsContainer = mainElement.querySelector('.films');
render(filmsContainer, filmListExtraTemplate('Top rated movies'), 'beforeend');
render(filmsContainer, filmListExtraTemplate('Most commented'), 'beforeend');

const filmListContainer = mainElement.querySelector('.films-list__container');
renderFilmCards(minFilms, filmListContainer);

const filmListElement = mainElement.querySelector('.films-list');

if (films.length > FILM_CARDS_PER_STEP) {
  let renderedFilmCount = FILM_CARDS_PER_STEP;

  render(filmListElement, showMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmListElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARDS_PER_STEP)
      .forEach((film) => render(filmListContainer, filmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_CARDS_PER_STEP;

    if(renderedFilmCount >= films.length) {
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

// const popup = generatePopup();

// render(footerElement, filmDetailsTemplate(popup), 'afterend');
