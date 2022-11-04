import { openPopup } from "./modal";
import { deleteCardFromServer, setLikeToServer, getUserInfoFromServer, getInitialCardsFromServer } from "./api.js";

const tempItem = document.querySelector('#element').content.querySelector('.elements__element');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');
let myId = '';

function setUserInfo() {
  getUserInfoFromServer()
  .then((data) => {
    const profileTitle = document.querySelector('.profile__title');
    const profileSubTitle = document.querySelector('.profile__subtitle');
    const profileAvatar = document.querySelector('.profile__avatar');
    profileTitle.textContent = data.name;
    profileSubTitle.textContent = data.about;
    profileAvatar.src = data.avatar;
    myId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });
}

function setInitialCards() {
  getInitialCardsFromServer()
  .then((data) => {
    const elementsContainer = document.querySelector('.elements');
    console.log(data);
    let cardId = '';
    data.forEach((newElement) => {
      if (newElement.owner._id === myId)
        cardId = newElement._id;
      else cardId = '';
      const newEl = addNewElement(newElement.link, newElement.name, newElement.likes.length, cardId, newElement._id);
      const myLike = newElement.likes.some(element => element._id === myId);
      if (myLike) newEl.querySelector('.elements__like').classList.toggle('elements__like_active');
      elementsContainer.append(newEl);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteCard(evt) {
  deleteCardFromServer(evt)
  .then((data) => {
    evt.target.closest('.elements__element').remove();
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function setLike(evt) {
  setLikeToServer(evt)
  .then((data) => {
    evt.target.dataset.count = data.likes.length;
    evt.target.classList.toggle('elements__like_active');
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

//добавление нового элемента по параметрам
function addNewElement(elLink, elName, elLikes, elMyCard, elImageId) {
  const newEl = tempItem.cloneNode(true);
  const newElPhoto = newEl.querySelector('.elements__photo');
  const newElLike = newEl.querySelector('.elements__like');
  newElPhoto.src = elLink;
  newElPhoto.alt = 'Фото ' + elName;
  newEl.querySelector('.elements__title').textContent = elName;
  newElLike.dataset.count = elLikes;
  newElLike.dataset.imageid = elImageId;
  newElLike.addEventListener('click', setLike);
  const elThrash = newEl.querySelector('.elements__thrash');
  if (elMyCard) {
    elThrash.dataset.id = elMyCard;
    elThrash.addEventListener('click', deleteCard);
  } else {
    elThrash.remove();
  }
  newElPhoto.addEventListener('click', function (evt) {
    popupImagePicture.src = elLink;
    popupImageTitle.textContent = elName;
    popupImagePicture.alt = 'Фото ' + elName;
    openPopup(popupImage);
  });
  return newEl;
}

export { addNewElement, setUserInfo, setInitialCards };
