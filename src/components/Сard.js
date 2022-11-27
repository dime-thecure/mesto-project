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
    return document.querySelector(this._selector).content.querySelector('.elements__element').cloneNode(true);
  }

  // заполняем карточку содержимым
  generate(handleLike, handleOpen, handleDelete) {
    this._element = this._getElement();

    this._element.querySelector('.elements__title').textContent = this._title;
    this._cardImage = this._element.querySelector('.elements__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardLike = this._element.querySelector('.elements__like');
    this._cardLike.dataset.count = this._likes;

    //изначально активируем или не актвируем кнопку лайка
    if (this._hasMyLike) this._cardLike.classList.add('elements__like_active');

    this._addEventListeners(handleLike, handleOpen, handleDelete);

    // возвращаем элемент в качестве результата работы метода
    return this._element;
  }

  //учтанавливаем слушатели событий;
  _addEventListeners(handleLike, handleOpen, handleDelete) {
    const deleteButton = this._element.querySelector('.elements__thrash');
    if (this._isMyCard) {
      deleteButton.dataset.id = this._isMyCard;
      this._element.querySelector(".elements__thrash").addEventListener("click", () => {
        handleDelete(this._id)
          .then(() => {
            this._element.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      })
    } else {
      deleteButton.remove();
    };

    this._cardImage.addEventListener('click', () => {
      handleOpen(this._link, this._title);
    });

    this._cardLike.addEventListener("click", (evt) => {
      if (this._hasMyLike) {
        handleLike(this._id, this._hasMyLike)
        .then((data) => {
          evt.target.classList.remove('elements__like_active');
          evt.target.dataset.count = data.likes.length;
          this._hasMyLike = false;
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        handleLike(this._id, this._hasMyLike)
        .then((data) => {
          evt.target.classList.add('elements__like_active');
          evt.target.dataset.count = data.likes.length;
          this._hasMyLike = true;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    })
  }
}
