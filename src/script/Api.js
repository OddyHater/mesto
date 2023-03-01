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

  changeProfileInfo({name, description}) {
    fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._myToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    });
  }

  pushCardToServer(name, link) {
    console.log(name, link);
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

  removeCardFromServer() {
    
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
            link: card.link
          };
        cards.push(cardData);
        });
        return cards;
      })
  }


}