export default class API {
  _baseURL;
  _headers;

  constructor({baseUrl, headers}) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfoFromServer() {
    const userUrl = this._baseURL + '/users/me';
    return fetch(userUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  getInitialCardsFromServer() {
    const userUrl = this._baseURL + '/cards';
    return fetch(userUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  setUserInfoToServer(name, about) {
    const userUrl = this._baseURL + '/users/me';
    return fetch(userUrl, {
      method: 'PATCH',
      headers: this._headers,
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
    const userUrl = this._baseURL + '/cards';
    return fetch(userUrl, {
      method: 'POST',
      headers: this._headers,
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
    const userUrl = this._baseURL + '/cards/' + cardId;
    return fetch(userUrl, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  changeAvatarToServer(url) {
    const userUrl = this._baseURL + '/users/me/avatar';
    return fetch(userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  setLikeToServer(cardId, hasMyLike) {
    const userUrl = this._baseURL + '/cards/likes/' + cardId;
    let methodType = '';
    if (hasMyLike) {
      methodType = 'DELETE';
    } else {
      methodType = 'PUT';
    }
    return fetch(userUrl, {
      method: `${methodType}`,
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }
}
