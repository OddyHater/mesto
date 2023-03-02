export class Api {
  constructor(token) {
    this._myToken = token;    
  }

  getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      headers: {
        authorization: this._myToken
      }
    })
      .then(res => res.json())
      .then((result) => {
        return result;
      })
  }

  changeProfileInfo(item) {
    return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._myToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        about: item.link
      })
    });
  }

  pushCardToServer(name, link, like) {    
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      method: 'POST',
      headers: {
        authorization: this._myToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
        like: like
      })
    })
  }

  removeCardFromServer(cardID) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._myToken
      }
    })
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._myToken
      }
    })
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: 'DELETE', 
      headers: {
        authorization: this._myToken
      }
    })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      headers: {
        authorization: this._myToken
      }
    })
      .then(res => res.json())
      .then((result) => {
        const cards = []
        result.forEach(card => {          
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
        return cards;
      })
  }


}