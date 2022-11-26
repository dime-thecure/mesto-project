import { openPopup } from "./modal";
import { deleteCardFromServer, setLikeToServer } from "./api.js";

const tempItem = document.querySelector('#element').content.querySelector('.elements__element');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');

function deleteCard(evt) {
  evt.target.closest('.elements__element').remove();
}

function handleDeleteCardButton(evt) {
  deleteCardFromServer(evt)
  .then((data) => {
    deleteCard(evt);
    console.log(data);
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
  setLikeToServer(evt)
  .then((data) => {
    setLike(evt, data.likes.length);
    console.log(data);
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
