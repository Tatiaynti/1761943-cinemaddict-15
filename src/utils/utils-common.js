import dayjs from 'dayjs';
import {FilterType} from '../const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const MAX_LENGTH = 140;
const MINUTE_IN_HOUR = 60;

export const sliceDescription = (text) =>
  text.length >= MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;

export const formatReleaseDate = (date, format) => dayjs(date).format(format);

export const sortByDate = (film1, film2) => dayjs(film2.release).diff(film1.release);
export const sortByRaing = (film1, film2) => film2.rating - film1.rating;

export const generateRuntime = (time) => {
  const hour = dayjs.duration(time, 'm').format('H');
  const minute = dayjs.duration(time, 'm').format('m');
  if (time < MINUTE_IN_HOUR) {
    return `${minute}m`;
  }
  return `${hour}h ${minute}m`;
};

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
