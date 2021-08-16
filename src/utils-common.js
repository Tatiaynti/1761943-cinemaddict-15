const RenderPosition = {
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export {renderTemplate, renderElement, createElement, RenderPosition};
