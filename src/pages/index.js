import FormValidator from '../components/FormValidator.js';
import { Card } from '../components/Сard.js';
import { myUrl, myToken, myGroup, validationSettings } from "../utils/consts.js"
import API from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js'


const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
const newItemPopup = document.querySelector('#newItem');
const newItemPopupInputAbout = newItemPopup.querySelector('#newItem-about');
const newItemPopupInputName = newItemPopup.querySelector('#newItem-name');
const changeAvatarPopup = document.querySelector('#changeAvatar');
let myId = '';

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

      const reversedData = data.reverse();

      const sec = new Section({
        items: reversedData,
        renderer: (item) => {
          const newCard = new Card({ ...item, myId }, '.elements__element');
          const cardEl = newCard.generate()
          sec.addItem(cardEl)
        }
      }, '.elements');

      sec.renderItems()
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
      changeAvatarPopupWithForm.close();
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

      const sec = new Section({
        items: [data],
        renderer: (item) => {
          const newCard = new Card({ ...item, myId }, '.elements__element');
          const cardEl = newCard.generate()
          sec.addItem(cardEl)
        }
      }, '.elements');

      sec.renderItems()

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = popupButton.dataset.text;
      newItemPopupWithForm.close();
    });
}

//cтавим слушатели на все элементы документа
function setDocumentEventListeners() {

  //нажатие на кнопку редактирования профиля на странице
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    profilePopupName.value = name;
    profilePopupAbout.value = about;
    profilePopupWithForm.open();
  });

  //нажатие на кнопку добавления нового места на странице
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    newItemPopupWithForm.open();
  });

  //нажатие на кнопку редактирования аватара
  document.querySelector('.profile__image-block').addEventListener('click', () => {
    changeAvatarPopupWithForm.open();
  });
}

// function enableValidation() {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((formElement) => {
//     const instance = new FormValidator(validationSettings, formElement);
//     instance.enableValidation();
//   });
// }


export const userInfo = new UserInfo(
  {
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle',
    selectorAvatar: '.profile__avatar'
  });

export const api = new API(myUrl, myGroup, myToken);

export const popupWithImage = new PopupWithImage('#popupImage');
popupWithImage.setEventListeners();

const newItemPopupWithForm = new PopupWithForm({ selector: '#newItem', handlePopupSubmitButton: handleNewItemPopupSubmitButton });
newItemPopupWithForm.setEventListeners();
const newItemPopupWithFormValidation = new FormValidator(validationSettings, '#newItem');
newItemPopupWithFormValidation.enableValidation();

const profilePopupWithForm = new PopupWithForm({ selector: '#profile', handlePopupSubmitButton: handleProfilePopupSubmitButton });
profilePopupWithForm.setEventListeners();
const profilePopupWithFormValidation = new FormValidator(validationSettings, '#profile');
profilePopupWithFormValidation.enableValidation();

const changeAvatarPopupWithForm = new PopupWithForm({ selector: '#changeAvatar', handlePopupSubmitButton: handleAvatarPopupSubmitButton });
changeAvatarPopupWithForm.setEventListeners();
const changeAvatarPopupWithFormValidation = new FormValidator(validationSettings, '#changeAvatar');
changeAvatarPopupWithFormValidation.enableValidation();

//Загружаем профиль
setUserInfo();
//Создаем начальные карточки
setInitialCards();
//Ставим слушатели на все элементы документа
setDocumentEventListeners();
// //Запускаем валидацию
// enableValidation();
