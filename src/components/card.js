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
  constructor({ link, title, likes, isMyCard, hasMyLike, selector }) {
    this._link = link;
    this._title = title;
    this._likes = likes;
    this._isMyCard = isMyCard;
    this._hasMyLike = hasMyLike;
    this._selector = selector;
  }

  // возвращаем DOM-элемент карточки
  _getElement() {
    return document.querySelector('#element').content.querySelector(this._selector).cloneNode(true);
    // "селектор её template-элемента" - это #element, .elements__element или целая строка нахождения элемента? (решить вопрос)
  }

  // заполняем карточку содержимым
  generate() {
    this._element = this._getElement();
    this._element.querySelector('.elements__title').textContent = this._title;
    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__photo').alt = this._title;
    this._element.querySelector('.elements__like').dataset.count = this._likes; //length?
    // возвращаем элемент в качестве результата работы метода

    const like = this._element.querySelector('.elements__like');
    if (this._hasMyLike) like.classList.add('elements__like_active');

    return this._element;
  }

  //учтанавливаем слушатели событий;
  _addEventListeners() {
    const deleteButton = this._element.querySelector('.elements__thrash');
    if (this._isMyCard) {
      deleteButton.dataset.id = this._isMyCard;
      this._element.querySelector(".elements__thrash").addEventListener("click", handleDeleteCardButton)
    } else {
      deleteButton.remove();
    };

    this._element.querySelector(".elements__photo").addEventListener('click', function () {
      popupImagePicture.src = this._link;
      popupImageTitle.textContent = this._title;
      popupImagePicture.alt = 'Фото ' + this._title;
      openPopup(popupImage);
    });

    const like = this._element.querySelector('.elements__like');
    like.addEventListener("click", function () { })
  }

  //содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  renderCard() {
    const newCard = this.generate();
    this._addEventListeners();

    //добавим их в DOM для отладки
    const elementsContainer = document.querySelector('.elements');
    elementsContainer.append(newCard);
  }
}
