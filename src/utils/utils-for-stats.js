import dayjs from 'dayjs';

export const DurationFormat = {
  HOUR: 'hour',
  MINUTE: 'minute',
};

export const getTotalDuration = (movies, format) => {
  const totalDuration = movies.reduce((acc, movie) => acc += movie.runtime, 0);
  switch (format) {
    case DurationFormat.HOUR:
      return dayjs.duration(totalDuration, 'm').format('H');
    case DurationFormat.MINUTE:
      return dayjs.duration(totalDuration, 'm').format('m');
  }
};

export const getGenres = (movies) => {
  const genres = new Set();
  movies.forEach((movie) => movie.genres.forEach((gener) => genres.add(gener)));
  return genres;
};

export const countGenres = (movies) => {
  const allGenres = [];
  movies.forEach((movie) => allGenres.push(...movie.genres));
  const genres = [];
  getGenres(movies).forEach((genre) => genres.push({genre: genre, count: allGenres.filter((movieGenres) => movieGenres === genre).length}));
  return genres;
};

export const getGenresCount = (movies) => {
  const counts = [];
  countGenres(movies).forEach((genre) => counts.push(genre.count));
  return counts;
};

export const getTopGenre = (movies) => {
  const topGenre = countGenres(movies);
  topGenre.sort((prev, next) => next.count - prev.count);
  return topGenre[0].genre;
};
