const myUrl = 'https://nomoreparties.co/v1/';
const myToken = '450ae940-2b7e-4477-a632-282343b7d2dc';
const myGroup = 'plus-cohort-16';

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject('Ошибка: ${res.status}');
  }
  return res.json();
}

function getUserInfoFromServer() {
  const userUrl = myUrl + myGroup + '/users/me';
  return fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return getResponseData(res);
    })
}

function getInitialCardsFromServer() {
  const userUrl = myUrl + myGroup + '/cards';
  return fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return getResponseData(res)
    })
}

function setUserInfoToServer(name, about) {
  const userUrl = myUrl + myGroup + '/users/me';
  return fetch(userUrl, {
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
      return getResponseData(res);
    });
}

function addNewCardToServer(link, name) {
  const userUrl = myUrl + myGroup + '/cards';
  return fetch(userUrl, {
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
      return getResponseData(res);
    });
}

function deleteCardFromServer(evt) {
  const id = evt.target.dataset.id;
  const userUrl = myUrl + myGroup + '/cards/' + id;
  return fetch(userUrl, {
    method: 'DELETE',
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return getResponseData(res);
    });
}

function changeAvatarToServer(url) {
  const userUrl = myUrl + myGroup + '/users/me/avatar';
  return fetch(userUrl, {
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

      return getResponseData(res);
    });
}

function setLikeToServer(evt) {
  const cardId = evt.target.dataset.imageid;
  const userUrl = myUrl + myGroup + '/cards/likes/' + cardId;
  let methodType = '';
  if (evt.target.classList.contains('elements__like_active')) {
    methodType = 'DELETE';
  } else {
    methodType = 'PUT';
  }
  return fetch(userUrl, {
    method: `${methodType}`,
    headers: {
      authorization: `${myToken}`
    }
  })
    .then((res) => {
      return getResponseData(res);
    });
}

export { getUserInfoFromServer, getInitialCardsFromServer, setUserInfoToServer, addNewCardToServer, deleteCardFromServer, setLikeToServer, changeAvatarToServer }
