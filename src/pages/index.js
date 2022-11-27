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
let sec = '';

function createCard(item) {
  const newCard = new Card({ ...item, myId }, '#element');
  const cardEl = newCard.generate(api.setLikeToServer.bind(api), popupWithImage.open.bind(popupWithImage), api.deleteCardFromServer.bind(api))
  return cardEl
}


function setInitialCards(data) {
  const reversedData = data.reverse();

  sec = new Section({
    items: reversedData,
    renderer: (item) => {
      const card = createCard(item)
      sec.addItem(card)
    }
  }, '.elements');

  sec.renderItems()
}

//нажатие на Сохранить на форме аватара
function handleAvatarPopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  const { about: url } = changeAvatarPopupWithForm.getInputValues();
  api.changeAvatarToServer(url)
    .then((data) => {
      userInfo.setUserAvatar(data);
      changeAvatarPopupWithForm.close();
    }).then(() => {
      popupButton.textContent = popupButton.dataset.text;
    })
    .catch((err) => {
      console.log(err);
    })
}

//нажатие на Сохранить формы профиля
function handleProfilePopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  const { name, about } = profilePopupWithForm.getInputValues();
  api.setUserInfoToServer(name, about)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopupWithForm.close();
    }).then(() => {
      popupButton.textContent = popupButton.dataset.text;
    })
    .catch((err) => {
      console.log(err);
    })
}

//нажатие на Создать на форме нового места
function handleNewItemPopupSubmitButton(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  api.addNewCardToServer(newItemPopupInputAbout.value, newItemPopupInputName.value)
    .then((data) => {
      const card = createCard(data)
      sec.addItem(card)

    }).then(() => {
      popupButton.textContent = popupButton.dataset.text;
      newItemPopupWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
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

export const userInfo = new UserInfo(
  {
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle',
    selectorAvatar: '.profile__avatar'
  });

export const api = new API({
  baseUrl: myUrl + myGroup,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

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

//Загружаем профиль и создаем начальные карточки
Promise.all([api.getUserInfoFromServer(), api.getInitialCardsFromServer()])
  .then(([userData, cardsData]) => {
    //Профиль
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    myId = userData._id;
    //Карточки
    setInitialCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//Ставим слушатели на все элементы документа
setDocumentEventListeners();
