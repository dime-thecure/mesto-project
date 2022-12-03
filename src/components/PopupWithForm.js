import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  _instance;
  _handlePopupSubmitButton;
  _inputList;
  _formValues;

  constructor({ selector, handlePopupSubmitButton }) {
    super(selector);
    this._instance = super._getElement();
    this._inputList = this._instance.querySelectorAll('.popup__input');
    this._formValues = {};
    this._handlePopupSubmitButton = handlePopupSubmitButton;
  }

  getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
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
