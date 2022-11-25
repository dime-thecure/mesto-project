import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './modal.js';
import { Card } from './card.js';
import { myUrl, myToken, myGroup, validationSettings } from "./consts.js"
import API from './Api.js';
import { userInfo } from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
const newItemPopup = document.querySelector('#newItem');
const newItemPopupInputAbout = newItemPopup.querySelector('#newItem-about');
const newItemPopupInputName = newItemPopup.querySelector('#newItem-name');
const changeAvatarPopup = document.querySelector('#changeAvatar');
let myId = '';

export const api = new API(myUrl, myGroup, myToken);

export const popupWithImage = new PopupWithImage('#popupImage');
popupWithImage.setEventListeners();

function setUserInfo() {
  api.getUserInfoFromServer()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.setUserAvatar(data);
      myId = data._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

function setInitialCards() {
  api.getInitialCardsFromServer()
    .then((data) => {

      // смотрим структуру ответа для отладки (потом удалить)
      console.log(data);

      data.forEach((newElement) => {
        const newCard = new Card({ ...newElement, myId }, '.elements__element');
        newCard.renderCard();
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
      userInfo.setUserAvatar({ avatar: url });
      //closePopup(changeAvatarPopup);
      changeAvatarPopupWithForm.close();
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
      userInfo.setUserInfo(data);
      //closePopup(profilePopup);
      profilePopupWithForm.close();
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
  // //нажатие на крестик закрытия на форме профиля
  // profilePopup.querySelector('.popup__close-button').addEventListener('click', () => {
  //   closePopup(profilePopup);
  // });

  //нажатие на крестик закрытия на форме нового места
  newItemPopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(newItemPopup);
  });

  // //нажатие на крестик закрытия формы редактирования аватара
  // changeAvatarPopup.querySelector('.popup__close-button').addEventListener('click', () => {
  //   closePopup(changeAvatarPopup);
  // });

  //нажатие на кнопку редактирования профиля на странице
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    profilePopupName.value = name;
    profilePopupAbout.value = about;
    //openPopup(profilePopup);
    profilePopupWithForm.open();
  });

  //нажатие на Сохранить на форме профиля
  //profilePopup.querySelector('#form-profile').addEventListener('submit', handleProfilePopupSubmitButton);

  //нажатие на кнопку добавления нового места на странице
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup(newItemPopup);
  });

  //нажатие на кнопку редактирования аватара
  document.querySelector('.profile__image-block').addEventListener('click', () => {
    //openPopup(changeAvatarPopup);
    changeAvatarPopupWithForm.open();
  });

  // //нажатие на Сохранить на форме редактирования аватара
  // changeAvatarPopup.querySelector('#form-changeAvatar').addEventListener('submit', handleAvatarPopupSubmitButton);

  //нажатие на Создать на форме нового места
  newItemPopup.querySelector('#form-newItem').addEventListener('submit', handleNewItemPopupSubmitButton);

  // //нажатие на крестик закрытия на открытой картинке
  // popupImage.querySelector('.popup__close-button').addEventListener('click', function () {
  //   closePopup(popupImage);
  // });

}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    const instance = new FormValidator(validationSettings, formElement);
    instance.enableValidation();
  });

}

const profilePopupWithForm = new PopupWithForm ({selector: '#profile', handlePopupSubmitButton: handleProfilePopupSubmitButton});
profilePopupWithForm.setEventListeners();

const changeAvatarPopupWithForm = new PopupWithForm ({selector: '#changeAvatar', handlePopupSubmitButton: handleAvatarPopupSubmitButton});
changeAvatarPopupWithForm.setEventListeners();

//Загружаем профиль
setUserInfo();
//Создаем начальные карточки
setInitialCards();
//Ставим слушатели на все элементы документа
setDocumentEventListeners();
//Запускаем валидацию
enableValidation();
