export class Api {
  constructor(options) {    
    this._headers = options.headers
  }

  getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })      
  }

  changeProfileInfo(item) {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.link
      })
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    });
  }

  pushCardToServer(name, link, like) {    
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        like: like
      })          
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeCardFromServer(cardID) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const cards = []
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
        console.log(cards);
        return cards; //возвращаем сформированный объект карточки для дальнейшей отрисовки
      })
  }


}