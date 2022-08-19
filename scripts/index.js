//нажатие на Сохранить формы профиля
function handleProfilePopupSubmitButton(evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubTitle.textContent = profilePopupAbout.value;
  OpenPopup(profilePopup);
}

//нажатие на Создать на форме нового места
function handleNewItemPopupSubmitButton(evt) {
  evt.preventDefault();
  const newEl = AddNewElement(newItemPopup.querySelector('#newItem-about').value, newItemPopup.querySelector('#newItem-name').value);
  elementsContainer.prepend(newEl);
  OpenPopup(newItemPopup);
  newItemPopup.querySelector('#form-newItem').reset();
}

//добавление нового элемента по двум параметрам
function AddNewElement(ElLink, ElName) {
  const newEl = TempItem.cloneNode(true);
  newEl.querySelector('.elements__photo').src = ElLink;
  newEl.querySelector('.elements__photo').alt = 'Фото ' + ElName;
  newEl.querySelector('.elements__title').textContent = ElName;
  newEl.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  newEl.querySelector('.elements__thrash').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  newEl.querySelector('.elements__photo').addEventListener('click', function (evt) {
    popupImagePicture.src = evt.target.src;
    popupImageTitle.textContent = evt.target.parentNode.querySelector('.elements__title').textContent;
    OpenPopup(popupImage);
  });
  return newEl;
}

//открытие и закрытие попап
function OpenPopup(popup) {
  popup.classList.toggle('popup_opened');
}

const elementsContainer = document.querySelector('.elements');
const profilePopup = document.querySelector('#profile');
const profilePopupName = profilePopup.querySelector('#profile-name');
const profilePopupAbout = profilePopup.querySelector('#profile-about');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const newItemPopup = document.querySelector('#newItem');
const popupImage = document.querySelector('#popupImage');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');
const TempItem = document.querySelector('#element').content.querySelector('.elements__element');

//заполняем карточки по константам
for (let i = 0; i < initialCards.length; i++){
  const newElement = AddNewElement(initialCards[i].link, initialCards[i].name);
  elementsContainer.append(newElement);
}

//нажатие на кнопку редактирования профиля на странице
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  profilePopupName.value = profileTitle.textContent;
  profilePopupAbout.value = profileSubTitle.textContent;
  OpenPopup(profilePopup);
});

//нажатие на крестик закрытия на форме профиля
profilePopup.querySelector('.popup__close-button').addEventListener('click', function () {
  OpenPopup(profilePopup);
});

//нажатие на Сохранить на форме профиля
profilePopup.querySelector('#form-profile').addEventListener('submit', handleProfilePopupSubmitButton);

//нажатие на кнопку добавления нового места на странице
document.querySelector('.profile__add-button').addEventListener('click', function () {
  OpenPopup(newItemPopup);
});

//нажатие на крестик закрытия на форме нового места
newItemPopup.querySelector('.popup__close-button').addEventListener('click', function () {
  OpenPopup(newItemPopup);
});

//нажатие на Создать на форме нового места
newItemPopup.querySelector('#form-newItem').addEventListener('submit', handleNewItemPopupSubmitButton);

//нажатие на крестик закрытия на открытой картинке
popupImage.querySelector('.popup__close-button').addEventListener('click', function () {
  OpenPopup(popupImage);
});
