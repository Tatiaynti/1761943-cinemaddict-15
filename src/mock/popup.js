import {generatePoster, generateTitle, genres, generateDescription} from './film.js';
import dayjs from 'dayjs';
import { generateComments } from './comments.js';
import { getRandomFloat, getRandomInteger } from './utils.js';

const generateDirector = () => {
  const directors = [
    'Steven Spielberg',
    'Martin Scorsese',
    'Quentin Tarantino',
    'Christopher Nolan',
    'David Fincher',
    'James Cameron',
    'Tim Burton',
  ];
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    'Charlie Kaufman, Spike Jonze, Jane Campion, Billy Wilder, Wes Anderson',
    'Richard Linklater, Anne Wigton, Heinz Herald, Richard Weil',
    'Anne Wigton, Spike Jonze, Charlie Kaufman',
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    'Adam Sandler, Dwayne Johnson, Ryan Reynolds, Ben Affleck',
    'Will Smith, Adam Driver, Finn Wolfhard',
    'Scarlett Johansson, Matt Damon, Millie Bobby Brown',
    'Reese Witherspoon, Bob Odenkirk, Robert Downey, Jr., James Gunn, Regé-Jean Page, Jennifer Aniston',
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];

};

const generateDate = () => {
  const day = dayjs().date((getRandomInteger(-22265, dayjs().date())));
  return dayjs(day).format('DD MMMM YYYY');
};

const generateCountry = () => {
  const countries = [
    'Germany',
    'USA',
    'Russia',
    'Italy',
    'Belgium',
    'Sweden',
    'Spain',
    'China',
    'Japan',
    'Ireland',
  ];
  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateAgeRating = () => {
  const ratings = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];
  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
};

const generatePopup = () => {
  const runtimeHours = getRandomInteger(1, 3);
  const runtimeMins = getRandomInteger(1, 60);
  const genresArray = new Array(getRandomInteger(1, genres.length)).fill('').map(() =>
    genres[getRandomInteger(0, genres.length - 1)]);
  return {
    fullPoster: generatePoster(),
    title: generateTitle(),
    rating: getRandomFloat(1, 10, 1),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: generateDate(),
    runtime: `${runtimeHours}h ${runtimeMins}m`,
    country: generateCountry(),
    genres: [...new Set(genresArray)],
    description: generateDescription(),
    ageRating: generateAgeRating(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    comments: generateComments(),
  };
};

export {generatePopup};
