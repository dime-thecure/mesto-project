import { openPopup } from "./modal.js";
import { api } from './index.js';
import { popupWithImage } from './index.js';


function handleCardDelete(cardId, card) {
  api.deleteCardFromServer(cardId)
    .then((data) => {
      card.remove();
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

// //добавление нового элемента по параметрам
// function addNewElement(elLink, elName, elLikes, elMyCard, elImageId, elMyLike) {
//   const newEl = tempItem.cloneNode(true);
//   const newElPhoto = newEl.querySelector('.elements__photo');
//   const newElLike = newEl.querySelector('.elements__like');
//   newElPhoto.src = elLink;
//   newElPhoto.alt = 'Фото ' + elName;
//   newEl.querySelector('.elements__title').textContent = elName;
//   newElLike.dataset.count = elLikes;
//   newElLike.dataset.imageid = elImageId;
//   newElLike.addEventListener('click', handleSetLikeButton);
//   const elThrash = newEl.querySelector('.elements__thrash');
//   if (elMyCard) {
//     elThrash.dataset.id = elMyCard;
//     elThrash.addEventListener('click', handleDeleteCardButton);
//   } else {
//     elThrash.remove();
//   }
//   if (elMyLike) newElLike.classList.toggle('elements__like_active');
//   newElPhoto.addEventListener('click', (evt) => {
//     popupImagePicture.src = elLink;
//     popupImageTitle.textContent = elName;
//     popupImagePicture.alt = 'Фото ' + elName;
//     openPopup(popupImage);
//   });
//   return newEl;
// }

// export { addNewElement };


// логика Card, реализованная в ООП
export class Card {
  // принимаем в конструктор данные карточки и селектор её template-элемента
  constructor(data, selector) {
    this._link = data.link;
    this._title = data.name;
    this._likes = data.likes.length;
    this._isMyCard = data.owner._id === data.myId;
    this._hasMyLike = data.likes.some(element => element._id === data.myId);
    this._id = data._id;
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

    //изначально активируем или не актвируем кнопку лайка
    const like = this._element.querySelector('.elements__like');
    if (this._hasMyLike) like.classList.add('elements__like_active');

    this._addEventListeners();

    // возвращаем элемент в качестве результата работы метода
    return this._element;
  }

  //учтанавливаем слушатели событий;
  _addEventListeners() {
    const deleteButton = this._element.querySelector('.elements__thrash');
    if (this._isMyCard) {
      deleteButton.dataset.id = this._isMyCard;
      this._element.querySelector(".elements__thrash").addEventListener("click", () => handleCardDelete(this._id, this._element))
    } else {
      deleteButton.remove();
    };

    this._element.querySelector(".elements__photo").addEventListener('click', () => {
      popupWithImage.open(this._link, this._title);
    });

    const like = this._element.querySelector('.elements__like');
    like.addEventListener("click", (evt) => {
      if (this._hasMyLike) {
        api.setLikeToServer(this._id, this._hasMyLike).then((data) => {
          evt.target.classList.remove('elements__like_active');
          evt.target.dataset.count = data.likes.length;
          this._hasMyLike = false;
        });

      } else {
        api.setLikeToServer(this._id, this._hasMyLike).then((data) => {
          evt.target.classList.add('elements__like_active');
          evt.target.dataset.count = data.likes.length;
          this._hasMyLike = true;
        });
      }
    })
  }

  // //содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  // renderCard() {
  //   const newCard = this.generate();

  //   //добавим их в DOM для отладки
  //   const elementsContainer = document.querySelector('.elements');
  //   elementsContainer.prepend(newCard);
  // }
}
