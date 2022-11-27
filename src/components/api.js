export default class API {
  _baseURL;
  _headers;

  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
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
    const url = this._baseURL + '/cards';
    const options = {
      method: 'GET',
      headers: this._headers,
    }
    return this._request(url, options)
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
    const url = this._baseURL + '/cards';
    const options = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }
    return this._request(url, options)
  }

  deleteCardFromServer(cardId) {
    const url = this._baseURL + '/cards/' + cardId;
    const options = {
      method: 'DELETE',
      headers: this._headers,
    }
    return this._request(url, options)
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
    const url = this._baseURL + '/cards/likes/' + cardId;
    let methodType = '';
    if (hasMyLike) {
      methodType = 'DELETE';
    } else {
      methodType = 'PUT';
    }
    const options = {
      method: `${methodType}`,
      headers: this._headers,
    }
    return this._request(url, options)
  }
}

