import { addNewElement } from "./card";

const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const newItemPopup = document.querySelector('#newItem');
const popupImage = document.querySelector('#popupImage');

//дублирование
const elementsContainer = document.querySelector('.elements');

//нажатие на Сохранить формы профиля
function handleProfilePopupSubmitButton(evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubTitle.textContent = profilePopupAbout.value;
  openPopup(profilePopup);
}

//нажатие на Создать на форме нового места
function handleNewItemPopupSubmitButton(evt) {
  evt.preventDefault();
  const newEl = addNewElement(newItemPopup.querySelector('#newItem-about').value, newItemPopup.querySelector('#newItem-name').value);
  elementsContainer.prepend(newEl);
  openPopup(newItemPopup);
  newItemPopup.querySelector('#form-newItem').reset();
}

//Слушатель на Esc и клик вне модалки
function escListener(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
    openPopup(document.querySelector('.popup_opened'));
  }
}

//открытие и закрытие попап, установка слушателя на Esc
function openPopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', escListener);
    popup.addEventListener('click', escListener);
  } else {
    document.removeEventListener('keydown', escListener);
  }
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
    openPopup(profilePopup);
  });

  //нажатие на Сохранить на форме профиля
  profilePopup.querySelector('#form-profile').addEventListener('submit', handleProfilePopupSubmitButton);

  //нажатие на кнопку добавления нового места на странице
  document.querySelector('.profile__add-button').addEventListener('click', function () {
    openPopup(newItemPopup);
  });

  //нажатие на крестик закрытия на форме нового места
  newItemPopup.querySelector('.popup__close-button').addEventListener('click', function () {
    openPopup(newItemPopup);
  });

  //нажатие на Создать на форме нового места
  newItemPopup.querySelector('#form-newItem').addEventListener('submit', handleNewItemPopupSubmitButton);

  //нажатие на крестик закрытия на открытой картинке
  popupImage.querySelector('.popup__close-button').addEventListener('click', function () {
    openPopup(popupImage);
  });

}

export { setDocumentEventListeners, openPopup };
