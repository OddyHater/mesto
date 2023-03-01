export class Api {
  constructor(token) {
    this._myToken = token;    
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