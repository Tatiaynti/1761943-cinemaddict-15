import dayjs from 'dayjs';
import {FilterType, ProfileRating} from '../const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MAX_LENGTH = 140;
const MINUTES_IN_HOUR = 60;
const TIME_COUNT = 1;
const MIN_FILMS_COUNT = 10;
const MAX_FILMS_COUNT = 20;

export const sliceDescription = (text) =>
  text.length >= MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;

export const formatReleaseDate = (date, format) => dayjs(date).format(format);

export const sortByRating = (films) => films.sort((prev, next) => next.rating - prev.rating);
export const sortByDate = (films) => films.sort((prev, next) => dayjs(next.releaseDate).diff(dayjs(prev.releaseDate)));

export const generateRuntime = (time) => {
  const hour = dayjs.duration(time, 'm').format('H');
  const minute = dayjs.duration(time, 'm').format('m');
  if (time < MINUTES_IN_HOUR) {
    return `${minute}m`;
  }
  return `${hour}h ${minute}m`;
};

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FilterType.STATS]: (films) => films,
};

export const filterStatsByWatchingDate = (movies, period) => {
  const deadline = dayjs().subtract(TIME_COUNT, period);
  return movies.filter((movie) => dayjs(movie.watchingDate).diff(deadline, 'minute') > 0);
};


export const createProfileRating = (watchedMoviesCount) => {
  const isNovice = watchedMoviesCount > 0 && watchedMoviesCount <= MIN_FILMS_COUNT;
  const isFan = watchedMoviesCount > MIN_FILMS_COUNT && watchedMoviesCount <= MAX_FILMS_COUNT;
  const isMovieBuff = watchedMoviesCount > MAX_FILMS_COUNT;

  if (isNovice) {
    return ProfileRating.NOVICE;
  } else if (isFan) {
    return ProfileRating.FAN;
  } else if (isMovieBuff) {
    return ProfileRating.MOVIE_BUFF;
  } else {
    return '';
  }
};
