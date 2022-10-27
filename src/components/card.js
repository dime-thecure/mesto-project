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
  const newElPhoto = newEl.querySelector('.elements__photo');
  newElPhoto.src = elLink;
  newElPhoto.alt = 'Фото ' + elName;
  newEl.querySelector('.elements__title').textContent = elName;
  newEl.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  newEl.querySelector('.elements__thrash').addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove();
  });
  newElPhoto.addEventListener('click', function (evt) {
    popupImagePicture.src = elLink;
    popupImageTitle.textContent = elName;
    popupImagePicture.alt = 'Фото ' + elName;
    openPopup(popupImage);
  });
  return newEl;
}

//заполняем карточки по константам
function initCards () {
  initialCards.forEach((newElement) => {
    elementsContainer.append(addNewElement(newElement.link, newElement.name));
  });
}

export {initCards,addNewElement};
