import {generateComments} from './comments.js';
import {getRandomFloat, getRandomInteger} from '../utils/utils-for-mock.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

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

const generateDate = () => {
  const day = dayjs().date((getRandomInteger(-22265, dayjs().date())));
  return dayjs(day);
};

const generateFilm = () => {
  const runtimeHours = getRandomInteger(1, 3);
  const runtimeMins = getRandomInteger(1, 60);
  const genresArray = new Array(getRandomInteger(1, GENRES.length)).fill('').map(() =>
    GENRES[getRandomInteger(0, GENRES.length - 1)]);
  return {
    id: nanoid(),
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: getRandomFloat(1, 10, 1),
    runtime: {runtimeHours, runtimeMins},
    genres: [...new Set(genresArray)],
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: generateDate(),
    country: generateCountry(),
    ageRating: generateAgeRating(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
  };
};

const generateFilms = (filmsCount) => new Array(filmsCount).fill().map(generateFilm);

export {generatePoster, generateTitle, GENRES, generateDescription, generateFilms};
