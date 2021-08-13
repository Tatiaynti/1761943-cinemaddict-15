const filmFiltersMap = {
  favorites: (films) => films.filter((film) => film.isFavorite).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  inWatchlist: (films) => films.filter((film) => film.isInWatchlist).length,
};

export const generateFilter = (films) => Object.entries(filmFiltersMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
