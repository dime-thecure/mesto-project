export default class API {
  _baseURL;
  _group;
  _token;
  _userURL;

  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  getUserInfoFromServer() {
    const userUrl = this._baseURL + '/users/me';
    const options = {
      method: 'GET',
      headers: this._headers,
    }
    return this._request(userUrl, options)
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
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    }
    return this._request(userUrl, options)
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
    const newUrl = this._baseURL + '/users/me/avatar';
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${url}`
      })
    }
    return this._request(newUrl, options)
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
