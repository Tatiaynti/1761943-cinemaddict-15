import Abstract from '../view/abstract.js';

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
