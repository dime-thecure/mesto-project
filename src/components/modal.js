import { addNewElement } from "./card.js";
import { setUserInfo, addNewCardToServer, changeAvatarToServer } from "./api.js";

const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const newItemPopup = document.querySelector('#newItem');
const newItemPopupInputAbout = newItemPopup.querySelector('#newItem-about');
const newItemPopupInputName = newItemPopup.querySelector('#newItem-name');
const popupImage = document.querySelector('#popupImage');
const changeAvatarPopup = document.querySelector('#changeAvatar');

const elementsContainer = document.querySelector('.elements');

//нажатие на Сохранить формы профиля
function handleProfilePopupSubmitButton(evt) {
  evt.preventDefault();
  setUserInfo(profilePopupName.value, profilePopupAbout.value);
  profileTitle.textContent = profilePopupName.value;
  profileSubTitle.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
}

//нажатие на Создать на форме нового места
function handleNewItemPopupSubmitButton(evt) {
  evt.preventDefault();
  addNewCardToServer(newItemPopupInputAbout.value, newItemPopupInputName.value);
  closePopup(newItemPopup);
  evt.target.reset();
}

//нажатие на Сохранить на форме аватара
function handleAvatarPopupSubmitButton(evt) {
  evt.preventDefault();
  changeAvatarToServer(changeAvatarPopup.querySelector('#changeAvatar-about').value);
  closePopup(changeAvatarPopup);
  evt.target.reset();
}

//Слушатель на Esc
function handleEscape(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Слушатель на клик вне модалки
function handleOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//открытие попап, установка слушателя на Esc и клик
function openPopup(popup) {
  const popupButton = popup.querySelector('.popup__button');
  if (popupButton) popupButton.textContent = popupButton.dataset.text;
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOverlay);
}

//закрытие попап, удаление слушателя на Esc и клик
function closePopup(popup) {
  const popupButton = popup.querySelector('.popup__button');
  if (popupButton) popupButton.textContent = 'Сохранение...';
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', handleOverlay);
}

//cтавим слушатели на все элементы документа
function setDocumentEventListeners() {
  //нажатие на кнопку редактирования профиля на странице
  document.querySelector('.profile__edit-button').addEventListener('click', function () {
    profilePopupName.value = profileTitle.textContent;
    profilePopupAbout.value = profileSubTitle.textContent;
    openPopup(profilePopup);
  });

  //нажатие на крестик закрытия на форме профиля
  profilePopup.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup(profilePopup);
  });

  //нажатие на Сохранить на форме профиля
  profilePopup.querySelector('#form-profile').addEventListener('submit', handleProfilePopupSubmitButton);

  //нажатие на кнопку добавления нового места на странице
  document.querySelector('.profile__add-button').addEventListener('click', function () {
    openPopup(newItemPopup);
  });

  //нажатие на крестик закрытия на форме нового места
  newItemPopup.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup(newItemPopup);
  });

  //нажатие на кнопку редактирования аватара
  document.querySelector('.profile__image-block').addEventListener('click', function () {
    openPopup(changeAvatarPopup);
  });

  //нажатие на крестик закрытия формы редактирования аватара
  changeAvatarPopup.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup(changeAvatarPopup);
  });

  //нажатие на Сохранить на форме редактирования аватара
  changeAvatarPopup.querySelector('#form-changeAvatar').addEventListener('submit', handleAvatarPopupSubmitButton);

  //нажатие на Создать на форме нового места
  newItemPopup.querySelector('#form-newItem').addEventListener('submit', handleNewItemPopupSubmitButton);

  //нажатие на крестик закрытия на открытой картинке
  popupImage.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup(popupImage);
  });

}

export { setDocumentEventListeners, openPopup };
