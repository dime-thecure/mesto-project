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

  deleteCardFromServer(cardId) {
    const userUrl = this._baseURL + this._group + '/cards/' + cardId;
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

  setLikeToServer(cardId, hasMyLike) {
    const userUrl = this._baseURL + this._group + '/cards/likes/' + cardId;
    let methodType = '';
    if (hasMyLike) {
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