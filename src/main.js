import ProfileView from './view/profile.js';
import StatisticsView from './view/statistics.js';
// import {generateFilms} from './mock/film.js';
import {renderElement, RenderPosition} from './utils/utils-for-render.js';
import FilmsPresenter from './presenter/films-board-presenter.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic n83FAb12LQC7gfD';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

// const FILM_CARDS_COUNT = 18;

// const allFilms = generateFilms(FILM_CARDS_COUNT);

const filmsModel = new FilmsModel();
// filmsModel.setFilms(allFilms);

// const filtersModel = new FiltersModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const filtersModel = new FiltersModel();

renderElement(headerElement, new ProfileView(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filtersModel);
const filtersPresenter = new FiltersPresenter(mainElement, filtersModel, filmsModel);

filtersPresenter.init();
filmsPresenter.init();

renderElement(footerElement, new StatisticsView().getElement(), RenderPosition.AFTEREND);

api.getMovies()
  .then((movies) => {
    filmsModel.setFilms(UpdateType.INIT, movies);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
