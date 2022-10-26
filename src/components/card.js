import { openPopup } from "./modal";

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

const elementsContainer = document.querySelector('.elements');
const tempItem = document.querySelector('#element').content.querySelector('.elements__element');

const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');

//добавление нового элемента по двум параметрам
function addNewElement(elLink, elName) {
  const newEl = tempItem.cloneNode(true);
  newEl.querySelector('.elements__photo').src = elLink;
  newEl.querySelector('.elements__photo').alt = 'Фото ' + elName;
  newEl.querySelector('.elements__title').textContent = elName;
  newEl.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  newEl.querySelector('.elements__thrash').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  newEl.querySelector('.elements__photo').addEventListener('click', function (evt) {
    popupImagePicture.src = evt.target.src;
    popupImageTitle.textContent = evt.target.parentNode.querySelector('.elements__title').textContent;
    popupImagePicture.alt = 'Фото ' + popupImageTitle.textContent;
    openPopup(popupImage);
  });
  return newEl;
}

//заполняем карточки по константам
function initCards () {
  for (let i = 0; i < initialCards.length; i++){
    const newElement = addNewElement(initialCards[i].link, initialCards[i].name);
    elementsContainer.append(newElement);
  }
}

export {initCards,addNewElement};
