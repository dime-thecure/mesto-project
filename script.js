//нажатие на Сохранить формы профиля
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = profileForm.querySelector('#name').value;
  document.querySelector('.profile__subtitle').textContent = profileForm.querySelector('#about').value;
  profileForm.classList.toggle('popup_opened');
}

//нажатие на Создать на форме нового места
function newItemFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElement = document.querySelector('#element').content.querySelector('.elements__element').cloneNode(true);
  newElement.querySelector('.elements__photo').src = newItemForm.querySelector('#about').value;
  newElement.querySelector('.elements__title').textContent = newItemForm.querySelector('#name').value;
  newElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  newElement.querySelector('.elements__thrash').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  newElement.querySelector('.elements__photo').addEventListener('click', function (evt) {
    popupImage.querySelector('.popup-image__image').src = evt.target.src;
    popupImage.querySelector('.popup-image__title').textContent = evt.target.parentNode.querySelector('.elements__title').textContent;
    popupImage.classList.toggle('popup-image_opened');
  });
  elementsContainer.prepend(newElement);
  newItemForm.classList.toggle('popup_opened');
}

const elementsContainer = document.querySelector('.elements');
const profileForm = document.querySelector('#profile');
const newItemForm = document.querySelector('#newItem');
const popupImage = document.querySelector('#popupImage');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//заполняем карточки по константам
for (let i = 0; i < initialCards.length; i++){
  const newElement = document.querySelector('#element').content.querySelector('.elements__element').cloneNode(true);
  newElement.querySelector('.elements__photo').src = initialCards[i].link;
  newElement.querySelector('.elements__title').textContent = initialCards[i].name;
  newElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  newElement.querySelector('.elements__thrash').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  newElement.querySelector('.elements__photo').addEventListener('click', function (evt) {
    popupImage.querySelector('.popup-image__image').src = evt.target.src;
    popupImage.querySelector('.popup-image__title').textContent = evt.target.parentNode.querySelector('.elements__title').textContent;
    popupImage.classList.toggle('popup-image_opened');
  });
  elementsContainer.append(newElement);
}

//нажатие на кнопку редактирования профиля на странице
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  profileForm.querySelector('#name').value = document.querySelector('.profile__title').textContent;
  profileForm.querySelector('#about').value = document.querySelector('.profile__subtitle').textContent;
  profileForm.classList.toggle('popup_opened');
});

//нажатие на крестик закрытия на форме профиля
profileForm.querySelector('.popup__close-button').addEventListener('click', function () {
  profileForm.classList.toggle('popup_opened');
});

//нажатие на Сохранить на форме профиля
profileForm.querySelector('.form-profile').addEventListener('submit', profileFormSubmitHandler);

//нажатие на кнопку добавления нового места на странице
document.querySelector('.profile__add-button').addEventListener('click', function () {
  newItemForm.classList.toggle('popup_opened');
});

//нажатие на крестик закрытия на форме нового места
newItemForm.querySelector('.popup__close-button').addEventListener('click', function () {
  newItemForm.classList.toggle('popup_opened');
});

//нажатие на Создать на форме нового места
newItemForm.querySelector('.form-profile').addEventListener('submit', newItemFormSubmitHandler);

//нажатие на крестик закрытия на открытой картинке
popupImage.querySelector('.popup-image__close-button').addEventListener('click', function () {
  popupImage.classList.toggle('popup-image_opened');
});
