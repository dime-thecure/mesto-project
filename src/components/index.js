import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { addNewElement, Card } from './card.js';
//import { getUserInfoFromServer, getInitialCardsFromServer, setUserInfoToServer, changeAvatarToServer, addNewCardToServer } from "./api.js";

import { myUrl, myToken, myGroup } from "./consts.js"
import API from './api.js';
import { userInfo } from './userinfo.js';

const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubTitle = document.querySelector('.profile__subtitle');
const newItemPopup = document.querySelector('#newItem');
const newItemPopupInputAbout = newItemPopup.querySelector('#newItem-about');
const newItemPopupInputName = newItemPopup.querySelector('#newItem-name');
const popupImage = document.querySelector('#popupImage');
const changeAvatarPopup = document.querySelector('#changeAvatar');
let myId = '';

function setUserInfo() {
  getUserInfoFromServer()
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
  api.getUserInfoFromServer()
    .then((data) => {
      // const profileTitle = document.querySelector('.profile__title');
      // const profileSubTitle = document.querySelector('.profile__subtitle');
      // const profileAvatar = document.querySelector('.profile__avatar');
      // profileTitle.textContent = data.name;
      // profileSubTitle.textContent = data.about;
      // profileAvatar.src = data.avatar;
      userInfo.setUserInfo(data);
      userInfo.setUserAvatar(data);
      myId = data._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

function setInitialCards() {
  getInitialCardsFromServer()
    .then((data) => {
      const elementsContainer = document.querySelector('.elements');
      console.log(data);
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
  changeAvatarToServer(url)
    .then((data) => {
      document.querySelector('.profile__avatar').src = url;
      console.log(data);
      closePopup(changeAvatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
  api.changeAvatarToServer(url)
    .then((data) => {
      //document.querySelector('.profile__avatar').src = url;
      userInfo.setUserAvatar({ avatar: url });
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
  setUserInfoToServer(profilePopupName.value, profilePopupAbout.value)
    .then((data) => {
      profileTitle.textContent = profilePopupName.value;
      profileSubTitle.textContent = profilePopupAbout.value;
      console.log(data);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
  api.setUserInfoToServer(profilePopupName.value, profilePopupAbout.value)
    .then((data) => {
      // profileTitle.textContent = profilePopupName.value;
      // profileSubTitle.textContent = profilePopupAbout.value;
      userInfo.setUserInfo(data);
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
  addNewCardToServer(newItemPopupInputAbout.value, newItemPopupInputName.value)
    .then((data) => {
      const cardId = data._id;
      const elementsContainer = document.querySelector('.elements');
      const newEl = addNewElement(data.link, data.name, '0', cardId, cardId, 0);
      elementsContainer.prepend(newEl);
      console.log(data);
      closePopup(newItemPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
    });
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
    const { name, about } = userInfo.getUserInfo();
    profilePopupName.value = name;
    profilePopupAbout.value = about;
    // profilePopupName.value = profileTitle.textContent;
    // profilePopupAbout.value = profileSubTitle.textContent;
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


// проверяем рабоспособность класса Card
const card = new Card({
  elLink: "https://ae04.alicdn.com/kf/S2a6478f3892b489e8dbc616b74e4c3abq/-.jpg", elName: "Шрекси",
  elLikes: 2, elMyLike: false, selector: '.elements__element'
});

card.renderCard();
