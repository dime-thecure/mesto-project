import { addNewElement } from "./card.js";

const myUrl = 'https://nomoreparties.co/v1/';
const myToken = '450ae940-2b7e-4477-a632-282343b7d2dc';
const myGroup = 'plus-cohort-16';
var myId = '';

function getUserInfo() {
  const userUrl = myUrl + myGroup + '/users/me';
  fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return res.json();
    })
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

function getInitialCards() {
  const userUrl = myUrl + myGroup + '/cards';
  fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const elementsContainer = document.querySelector('.elements');
      console.log(data);
      var cardId = '';
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

function setUserInfo(name, about) {
  const userUrl = myUrl + myGroup + '/users/me';
  fetch(userUrl, {
    method: 'PATCH',
    headers: {
      authorization: `${myToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addNewCardToServer(link, name) {
  const userUrl = myUrl + myGroup + '/cards';
  fetch(userUrl, {
    method: 'POST',
    headers: {
      authorization: `${myToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cardId = data._id;
      const elementsContainer = document.querySelector('.elements');
      const newEl = addNewElement(data.link, data.name,'0', cardId, cardId);
      elementsContainer.prepend(newEl);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCardFromServer(evt) {
  const id = evt.target.dataset.id;
  const userUrl = myUrl + myGroup + '/cards/' + id;
  fetch(userUrl, {
    method: 'DELETE',
    headers: {
      authorization: `${myToken}`
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    evt.target.closest('.elements__element').remove();
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function changeAvatarToServer(url) {
  const userUrl = myUrl + myGroup + '/users/me/avatar';
  fetch(userUrl, {
    method: 'PATCH',
    headers: {
      authorization: `${myToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${url}`
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    document.querySelector('.profile__avatar').src = url;
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function setLike(evt) {
  const cardId = evt.target.dataset.imageid;
  const userUrl = myUrl + myGroup + '/cards/likes/' + cardId;
  var methodType = '';
  if (evt.target.classList.contains('elements__like_active')) {
    methodType = 'DELETE';
  } else {
    methodType = 'PUT';
  }
  fetch(userUrl, {
    method: `${methodType}`,
    headers: {
      authorization: `${myToken}`
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    evt.target.dataset.count = data.likes.length;
    evt.target.classList.toggle('elements__like_active');
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

export { getUserInfo, getInitialCards, setUserInfo, addNewCardToServer, deleteCardFromServer, setLike, changeAvatarToServer }
