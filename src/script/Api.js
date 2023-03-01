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

  pushCardToServer(name, link) {    
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      method: 'POST',
      headers: {
        authorization: this._myToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
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

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      headers: {
        authorization: this._myToken
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        const cards = []
        result.forEach(card => {          
          let cardData = {
            name: card.name,
            link: card.link,
            id: card._id,
            likes: card.likes.length
          };
        cards.push(cardData);
        });
        console.log(cards);
        return cards;
      })
  }


}