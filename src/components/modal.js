//Слушатель на Esc
function handleEscape(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Слушатель на клик вне модалки
function handleOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//открытие попап, установка слушателя на Esc и клик
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOverlay);
}

//закрытие попап, удаление слушателя на Esc и клик
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', handleOverlay);
}

export { openPopup, closePopup };
