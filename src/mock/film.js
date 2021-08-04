import { generateComments } from './comments.js';
import { FILM_CARDS_COUNT, getRandomFloat, getRandomInteger } from './utils.js';

const GENRES = [
  'action',
  'comedy',
  'drama',
  'fantasy',
  'adventure',
  'science fiction',
  'horror',
  'thriller',
  'western',
];

const generateTitle = () => {
  const titles = [
    'Atlantics',
    'The Big Lebowski',
    'A Clockwork Orange',
    'Dances With Wolves',
    'How to Train Your Dragon 2',
    'Hugo',
    'Lady Bird',
    'Middle of Nowhere',
    'Scott Pilgrim vs. the World',
    'The Social Network',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. ',
    'Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. ',
  ];
  const descriptionArray = new Array(getRandomInteger(1, description.length)).fill('').map(() =>
    description[getRandomInteger(0, 4)]);

  return [...new Set(descriptionArray)].join('');
};

const generateFilm = () => {
  const runtimeHours = getRandomInteger(1, 3);
  const runtimeMins = getRandomInteger(1, 60);
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: getRandomFloat(1, 10, 1),
    releaseYear: getRandomInteger(1960, 2021),
    runtime: `${runtimeHours}h ${runtimeMins}m`,
    genre: GENRES[getRandomInteger(0, GENRES.length - 1)],
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
  };
};

const films = new Array(FILM_CARDS_COUNT).fill().map(generateFilm);

const getFavorites = () => {
  const favorites = [];
  for (const film of films) {
    if (film.isFavorite) {
      favorites.push(film);
    }
  }
  return favorites;
};
const favoritesCount = getFavorites().length;

const getHistory = () => {
  const watched = [];
  for (const film of films) {
    if (film.isWatched) {
      watched.push(film);
    }
  }
  return watched;
};
const watchedCount = getHistory().length;

const getWatchlist = () => {
  const watchlist = [];
  for (const film of films) {
    if (film.isInWatchlist) {
      watchlist.push(film);
    }
  }
  return watchlist;
};
const watchlistCount = getWatchlist().length;

export {generatePoster, generateTitle, films, GENRES, generateDescription, FILM_CARDS_COUNT, favoritesCount, watchedCount, watchlistCount};
