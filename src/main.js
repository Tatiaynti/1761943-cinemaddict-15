import ProfileView from './view/profile.js';
import StatisticsView from './view/statistics.js';
import {generateFilms} from './mock/film.js';
import {renderElement, RenderPosition} from './utils/utils-for-render.js';
import {generateFilter} from './view/menu.js';
import FilmsPresenter from './presenter/films-board-presenter';

const FILM_CARDS_COUNT = 18;

const allFilms = generateFilms(FILM_CARDS_COUNT);
const filters = generateFilter(allFilms);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

renderElement(headerElement, new ProfileView(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(mainElement, filters);
filmsPresenter.init(allFilms);

renderElement(footerElement, new StatisticsView().getElement(), RenderPosition.AFTEREND);
