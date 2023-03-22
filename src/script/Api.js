export class Api {
  constructor(options) {    
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if(res.ok) {      
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeProfileInfo(item) {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.link
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  pushCardToServer(name, link, like, id) {    
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        like: like,
        id: id
      })
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  removeCardFromServer(cardID) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  changeAvatar(link) {  
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .then((result) => {
      const cards = [];
      result.forEach(card => {   //проходим по объектам, формируем будущую карточку
        let cardData = {
          name: card.name,
          link: card.link,
          id: card._id,
          likesArr: card.likes,
          likes: card.likes.length,
          owner: card.owner._id
        };
      cards.push(cardData);
      });        
      return cards; //возвращаем сформированный объект карточки для дальнейшей отрисовки
    })
  }


}