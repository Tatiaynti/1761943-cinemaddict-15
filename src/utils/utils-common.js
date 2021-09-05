import dayjs from 'dayjs';
import {FilterType} from '../const.js';

export const MAX_LENGTH = 140;

export const sliceDescription = (text) =>
  text.length >= MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;

export const changeDateFormatToYear = (date) => date.format('YYYY');
export const changeDateFormatToFull = (date) => date.format('DD MMMM YYYY');
export const changeDateFormatForComments = (date) => date.format(('YYYY/MM/DD'));

export const sortByDate = (film1, film2) => dayjs(film2.release).diff(film1.release);
export const sortByRaing = (film1, film2) => film2.rating - film1.rating;

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
