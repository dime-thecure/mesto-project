import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  _instance;
  _popupImagePicture;
  _popupImageTitle;

  constructor(selector) {
    super(selector);
    this._instance = super._getElement();
    this._popupImagePicture = this._instance.querySelector('.popup__image');
    this._popupImageTitle = this._instance.querySelector('.popup__title');
  }

  open(src, title) {
    this._popupImagePicture.src = src;
    this._popupImageTitle.textContent = title;
    this._popupImagePicture.alt = 'Фото ' + title;
    super.open();
  }
}
