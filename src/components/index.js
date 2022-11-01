import { enableValidation } from './validate.js';
import { getInitialCards } from "./api.js";
import { setDocumentEventListeners } from './modal.js';
import { getUserInfo } from './api.js';

//Загружаем профиль
getUserInfo();
//Создаем начальные карточки
getInitialCards();
//Ставим слушатели на все элементы документа
setDocumentEventListeners();
//Запускаем валидацию
enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
});
