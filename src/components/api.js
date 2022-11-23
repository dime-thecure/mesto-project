import { myUrl, myToken, myGroup } from "./consts";

export default class API {
  _baseURL;
  _group;
  _token;
  _userURL;

  constructor(baseURL, group, token) {
    this._baseURL = baseURL;
    this._group = group;
    this._token = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject('Ошибка: `${res.status}`');
    }
    return res.json();
  }

  getUserInfoFromServer() {
    const userUrl = this._baseURL + this._group + '/users/me';
    return fetch(userUrl, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCardsFromServer() {
    const userUrl = this._baseURL + this._group + '/cards';
    return fetch(userUrl, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfoToServer(name, about) {
    const userUrl = this._baseURL + this._group + '/users/me';
    return fetch(userUrl, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCardToServer(link, name) {
    const userUrl = this._baseURL + this._group + '/cards';
    return fetch(userUrl, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCardFromServer(evt) {
    const id = evt.target.dataset.id;
    const userUrl = this._baseURL + this._group + '/cards/' + id;
    return fetch(userUrl, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  changeAvatarToServer(url) {
    const userUrl = this._baseURL + this._group + '/users/me/avatar';
    return fetch(userUrl, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  setLikeToServer(evt) {
    const cardId = evt.target.dataset.imageid;
    const userUrl = this._baseURL + this._group + '/cards/likes/' + cardId;
    let methodType = '';
    if (evt.target.classList.contains('elements__like_active')) {
      methodType = 'DELETE';
    } else {
      methodType = 'PUT';
    }
    return fetch(userUrl, {
      method: `${methodType}`,
      headers: {
        authorization: `${this._token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

}

/*
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
*/
