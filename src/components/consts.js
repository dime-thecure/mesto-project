import PopupWithImage from './PopupWithImage.js';

export const myUrl = 'https://nomoreparties.co/v1/';
export const myToken = '450ae940-2b7e-4477-a632-282343b7d2dc';
export const myGroup = 'plus-cohort-16';

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

export const popupImage = document.querySelector('#popupImage');
export const popupImagePicture = popupImage.querySelector('.popup__image');
export const popupImageTitle = popupImage.querySelector('.popup__title');
export const popupWithImage = new PopupWithImage(popupImage);
