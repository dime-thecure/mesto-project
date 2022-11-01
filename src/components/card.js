import { openPopup } from "./modal";
import { deleteCardFromServer, setLike } from "./api.js";

const tempItem = document.querySelector('#element').content.querySelector('.elements__element');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');

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
    elThrash.addEventListener('click', deleteCardFromServer);
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

export { addNewElement };
