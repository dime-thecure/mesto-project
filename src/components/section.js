export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer; // renderer — это функция отрисовки элмемента
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.map(item => {
      this._renderer(item)
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}

