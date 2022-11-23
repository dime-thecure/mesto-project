import { openPopup } from "./modal";
//import { deleteCardFromServer, setLikeToServer } from "./api.js";
import { api } from './index.js';

const tempItem = document.querySelector('#element').content.querySelector('.elements__element');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');

function deleteCard(evt) {
  evt.target.closest('.elements__element').remove();
}

function handleDeleteCardButton(evt) {
  api.deleteCardFromServer(evt)
    .then((data) => {
      deleteCard(evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

function setLike(evt, likesCount) {
  evt.target.dataset.count = likesCount;
  evt.target.classList.toggle('elements__like_active');
}

function handleSetLikeButton(evt) {
  api.setLikeToServer(evt)
    .then((data) => {
      setLike(evt, data.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

//добавление нового элемента по параметрам
function addNewElement(elLink, elName, elLikes, elMyCard, elImageId, elMyLike) {
  const newEl = tempItem.cloneNode(true);
  const newElPhoto = newEl.querySelector('.elements__photo');
  const newElLike = newEl.querySelector('.elements__like');
  newElPhoto.src = elLink;
  newElPhoto.alt = 'Фото ' + elName;
  newEl.querySelector('.elements__title').textContent = elName;
  newElLike.dataset.count = elLikes;
  newElLike.dataset.imageid = elImageId;
  newElLike.addEventListener('click', handleSetLikeButton);
  const elThrash = newEl.querySelector('.elements__thrash');
  if (elMyCard) {
    elThrash.dataset.id = elMyCard;
    elThrash.addEventListener('click', handleDeleteCardButton);
  } else {
    elThrash.remove();
  }
  if (elMyLike) newElLike.classList.toggle('elements__like_active');
  newElPhoto.addEventListener('click', function (evt) {
    popupImagePicture.src = elLink;
    popupImageTitle.textContent = elName;
    popupImagePicture.alt = 'Фото ' + elName;
    openPopup(popupImage);
  });
  return newEl;
}

export { addNewElement };


// логика Card, реализованная в ООП
export class Card {

  // принимаем в конструктор данные карточки и селектор её template-элемента
  constructor({ elLink, elName, elLikes, elMyCard, elMyLike, selector }) {
    this._elName = elName;
    this._elLink = elLink;
    this._elLikes = elLikes;
    this._elMyLike = elMyLike;
    this._elMyCard = elMyCard;
    this._selector = selector;
  }

  // возвращаем DOM-элемент карточки
  _getElement() {
    const cardElement = document.querySelector('#element').content.querySelector(this._selector).cloneNode(true);
    // "селектор её template-элемента" - это #element, .elements__element или целая строка нахождения элемента? (решить вопрос)
    return cardElement;
  }

  // заполняем карточку содержимым
  generate() {
    this._element = this._getElement();
    this._element.querySelector('.elements__title').textContent = this._elName;
    this._element.querySelector('.elements__photo').src = this._elLink;
    this._element.querySelector('.elements__photo').alt = this._elName;
    this._element.querySelector('.elements__like').dataset.count = this._elLikes; //length?

    // Вернём элемент в качестве результата работы метода
    return this._element;
  }

  //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _addEventListeners() {
    if (this._elMyCard) this._element.querySelector(".elements__thrash").addEventListener("click", function () { });

    this._element.querySelector(".elements__like").addEventListener("click", function () { });

    this._element.querySelector(".elements__photo").addEventListener('click', function (evt) {
      popupImagePicture.src = this._elLink;
      popupImageTitle.textContent = this._elName;
      popupImagePicture.alt = 'Фото ' + this._elName;
      openPopup(popupImage);
    });

  }

  //содержит приватные методы для каждого обработчика;
  _handleLike() {
    if (this._elMyLike) this._element.classList.toggle('elements__like_active');
  }

  //содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  renderCard() {
    const newCard = this.generate();

    this._handleLike();
    this._addEventListeners();

    //добавим их в DOM для отладки
    const elementsContainer = document.querySelector('.elements');
    elementsContainer.append(newCard);
  }

}
