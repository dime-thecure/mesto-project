export default class Popup {
  _popupSelector;
  _closeButton;

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._setEventListeners();
  }

  //нажатие на крестик закрытия на открытой картинке
  _setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  _getElement() {
    return this._popupSelector;
  }

  //Слушатель на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Слушатель на клик вне модалки
  _handleOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  //открытие попап, установка слушателя на Esc и клик
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.addEventListener('mousedown', this._handleOverlay.bind(this));
  }

  //закрытие попап, удаление слушателя на Esc и клик
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.removeEventListener('mousedown', this._handleOverlay.bind(this));
  }
}
