import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { addNewElement } from './card.js';
//import { getUserInfoFromServer, getInitialCardsFromServer, setUserInfoToServer, changeAvatarToServer, addNewCardToServer } from "./api.js";

import { myUrl, myToken, myGroup } from "./consts.js"
import API from './api.js';

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
let myId = '';

function setUserInfo() {
  api.getUserInfoFromServer()
    .then((data) => {
      const profileTitle = document.querySelector('.profile__title');
      const profileSubTitle = document.querySelector('.profile__subtitle');
      const profileAvatar = document.querySelector('.profile__avatar');
      profileTitle.textContent = data.name;
      profileSubTitle.textContent = data.about;
      profileAvatar.src = data.avatar;
      myId = data._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

function setInitialCards() {
  api.getInitialCardsFromServer()
    .then((data) => {
      const elementsContainer = document.querySelector('.elements');
      let cardId = '';
      data.forEach((newElement) => {
        if (newElement.owner._id === myId)
          cardId = newElement._id;
        else cardId = '';
        const myLike = newElement.likes.some(element => element._id === myId);
        const newEl = addNewElement(newElement.link, newElement.name, newElement.likes.length, cardId, newElement._id, myLike);
        elementsContainer.append(newEl);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//нажатие на Сохранить на форме аватара
function handleAvatarPopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  const url = changeAvatarPopup.querySelector('#changeAvatar-about').value;
  api.changeAvatarToServer(url)
    .then((data) => {
      document.querySelector('.profile__avatar').src = url;
      closePopup(changeAvatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
}

//нажатие на Сохранить формы профиля
function handleProfilePopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  api.setUserInfoToServer(profilePopupName.value, profilePopupAbout.value)
    .then((data) => {
      profileTitle.textContent = profilePopupName.value;
      profileSubTitle.textContent = profilePopupAbout.value;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
}

//нажатие на Создать на форме нового места
function handleNewItemPopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  api.addNewCardToServer(newItemPopupInputAbout.value, newItemPopupInputName.value)
    .then((data) => {
      const cardId = data._id;
      const elementsContainer = document.querySelector('.elements');
      const newEl = addNewElement(data.link, data.name, '0', cardId, cardId, 0);
      elementsContainer.prepend(newEl);

      closePopup(newItemPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
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

export const api = new API(myUrl, myGroup, myToken);

//Загружаем профиль
setUserInfo();
//Создаем начальные карточки
setInitialCards();
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
