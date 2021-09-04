import ProfileView from './view/profile.js';
import StatisticsView from './view/statistics.js';
import {generateFilms} from './mock/film.js';
import {renderElement, RenderPosition} from './utils/utils-for-render.js';
import FilmsPresenter from './presenter/films-board-presenter.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';

const FILM_CARDS_COUNT = 18;

const allFilms = generateFilms(FILM_CARDS_COUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(allFilms);

const filtersModel = new FiltersModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

renderElement(headerElement, new ProfileView(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filtersModel);
const filtersPresenter = new FiltersPresenter(mainElement, filtersModel, filmsModel);

filtersPresenter.init();
filmsPresenter.init();

renderElement(footerElement, new StatisticsView().getElement(), RenderPosition.AFTEREND);
