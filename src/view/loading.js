import AbstractView from './abstract.js';

const createLoadingTemplate = () => (
  `<h2 class="films-list__title">Loading...</h2>
  `
);

export default class LoadingElement extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
