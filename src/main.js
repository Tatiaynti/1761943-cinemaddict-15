import {profileTemplate} from './view/profile.js';
import {filmCardTemplate} from './view/film-card.js';
import {menuListTemplate} from './view/menu.js';
import {filmListTemplate} from './view/film-list.js';
import {filmListExtraTemplate} from './view/film-list-extra.js';
import {showMoreButtonTemplate} from './view/show-more-button.js';
import {filmDetailsTemplate} from './view/film-details.js';

const FILM_CARDS_COUNT = 5;
const EXTRA_CARDS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const renderFilmCards = (cardsCount, container) => {
  for (let i = 0; i < cardsCount; i++) {
    render(container, filmCardTemplate(), 'beforeend');
  }
};

render(headerElement, profileTemplate(), 'beforeend');
render(mainElement, menuListTemplate(), 'beforeend');
render(mainElement, filmListTemplate(), 'beforeend');

const filmsContainer = mainElement.querySelector('.films');
render(filmsContainer, filmListExtraTemplate('Top rated movies'), 'beforeend');
render(filmsContainer, filmListExtraTemplate('Most commented'), 'beforeend');

const filmListContainer = mainElement.querySelector('.films-list__container');
renderFilmCards(FILM_CARDS_COUNT, filmListContainer);

const filmListElement = mainElement.querySelector('.films-list');
render(filmListElement, showMoreButtonTemplate(), 'beforeend');

const filmExtraListContainer = [...filmsContainer.querySelectorAll('.films-list--extra')];

filmExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  renderFilmCards(EXTRA_CARDS, container);
});

render(footerElement, filmDetailsTemplate(), 'afterend');
