import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  _instance;
  _handlePopupSubmitButton;

  constructor({ selector, handlePopupSubmitButton }) {
    super(selector);
    this._instance = super._getElement();
    this._handlePopupSubmitButton = handlePopupSubmitButton;
  }

  setEventListeners() {
    this._instance.addEventListener('submit', this._handlePopupSubmitButton);
    super.setEventListeners();
  }

  close() {
    this._instance.querySelector('.form').reset();
    super.close();
  }
}
