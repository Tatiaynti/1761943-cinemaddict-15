import dayjs from 'dayjs';
import { FilterType } from '../const.js';
import Abstract from '../view/abstract.js';

export const MAX_LENGTH = 140;

export const RenderPosition = {
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const changeDateFormatToYear = (date) => date.format('YYYY');
export const changeDateFormatToFull = (date) => date.format('DD MMMM YYYY');
export const changeDateFormatForComments = (date) => date.format(('YYYY/MM/DD'));

export const sliceDescription = (text) =>
  text.length >= MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;

export const sortByDate = (film1, film2) => dayjs(film2.release).diff(film1.release);
export const sortByRaing = (film1, film2) => film2.rating - film1.rating;

export const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
