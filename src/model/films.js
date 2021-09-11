import AbstractObserver from '../utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, filmsList) {
    this._films = filmsList.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    if (indexFilm === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    const newComment = update.comments;
    this._films[indexFilm].comments = [...this._films[indexFilm].comments, newComment];
    this._notify(updateType, this._films[indexFilm]);
  }

  deleteComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    const indexComment = this._films[indexFilm].comments.findIndex((comment) => comment.id === update.comments.id);
    if (indexComment === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this._films[indexFilm].comments = [
      ...this._films[indexFilm].comments.slice(0, indexComment),
      ...this._films[indexFilm].comments.slice(indexComment + 1),
    ];
    this._notify(updateType, this._films[indexFilm]);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        ageRating: movie['film_info']['age_rating'],
        rating: movie['film_info']['total_rating'],
        genres: movie['film_info']['genre'],
        title: movie['film_info']['title'],
        poster: movie['film_info']['poster'],
        description: movie['film_info']['description'],
        director: movie['film_info']['director'],
        writers: movie['film_info']['writers'],
        actors: movie['film_info']['actors'],
        release: movie['film_info']['release']['date'],
        country: movie['film_info']['release']['release_country'],
        runtime: movie['film_info']['runtime'],
        isInWatchlist: movie['user_details']['watchlist'],
        isWatched: movie['user_details']['already_watched'],
        isFavorite: movie['user_details']['favorite'],
        comments: movie.comments,
        altTitle: movie['film_info']['alternative_title'],
        watchingDate: movie['user_details']['watching_date'],

      },
    );

    delete movie['film_info']['title'];
    delete movie['film_info']['alternative_title'];
    delete movie['film_info']['total_rating'];
    delete movie['film_info']['poster'];
    delete movie['film_info']['age_rating'];
    delete movie['film_info']['director'];
    delete movie['film_info']['writers'];
    delete movie['film_info']['actors'];
    delete movie['film_info']['release']['date'];
    delete movie['film_info']['release']['release_country'];
    delete movie['film_info']['release'];
    delete movie['film_info']['genre'];
    delete movie['film_info']['runtime'];
    delete movie['film_info']['description'];
    delete movie['user_details']['watchlist'];
    delete movie['user_details']['already_watched'];
    delete movie['user_details']['watching_date'];
    delete movie['user_details']['favorite'];

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'film_info': {
          'title': movie.title,
          'alternative_title': movie.altTitle,
          'total_rating': movie.rating,
          'poster': movie.poster,
          'age_rating': movie.ageRating,
          'director': movie.director,
          'writers': movie.writers,
          'actors': movie.actors,
          'release': {
            'date': movie.release,
            'release_country': movie.country,
          },
          'genre': movie.genres,
          'runtime': movie.runtime,
          'description': movie.description,
        },
        'user_details': {
          'watchlist': movie.isInWatchlist,
          'already_watched': movie.isWatched,
          'watching_date': movie.watchingDate,
          'favorite': movie.isFavorite,
        },
      },
    );

    delete movie.title;
    delete movie.altTitle;
    delete movie.rating;
    delete movie.poster;
    delete movie.ageRating;
    delete movie.director;
    delete movie.writers;
    delete movie.actors;
    delete movie.release;
    delete movie.country;
    delete movie.genres;
    delete movie.runtime;
    delete movie.description;
    delete movie.isInWatchlist;
    delete movie.isWatched;
    delete movie.watchingDate;
    delete movie.isFavorite;

    return adaptedMovie;
  }
}
