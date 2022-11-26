export default class Popup {
  _popupInstance;
  _closeButton;

  constructor(popupSelector) {
    this._popupInstance = document.querySelector(popupSelector);
    this._closeButton = this._popupInstance.querySelector('.popup__close-button');
  }

  //нажатие на крестик закрытия на открытой картинке
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  _getElement() {
    return this._popupInstance;
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
    this._popupInstance.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupInstance.addEventListener('mousedown', this._handleOverlay.bind(this));
  }

  //закрытие попап, удаление слушателя на Esc и клик
  close() {
    this._popupInstance.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupInstance.removeEventListener('mousedown', this._handleOverlay.bind(this));
  }
}
