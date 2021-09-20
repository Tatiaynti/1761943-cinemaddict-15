import StatisticsView from './view/footer-statistics.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FilmsPresenter from './presenter/films-board-presenter.js';
import FiltersPresenter from './presenter/filters.js';
import Api from './api.js';
import {remove, renderElement, RenderPosition} from './utils/utils-for-render.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic n83Fkw32edQC7gfD';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const filtersModel = new FiltersModel();

const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filtersModel, api);
const filtersPresenter = new FiltersPresenter(headerElement, mainElement, filtersModel, filmsModel);

filtersPresenter.init();
filmsPresenter.init();

const footerStatisticsView = new StatisticsView(filmsModel.getFilms());
renderElement(footerElement, footerStatisticsView, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    filmsModel.setFilms(UpdateType.INIT, movies);
    remove(footerStatisticsView);
    renderElement(footerElement, new StatisticsView(filmsModel.getFilms()), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
