import { initialCards } from "./cards.js";

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(`${this._templateSelector}`)
            .content.cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        const template = this._getTemplate().querySelector('.card');

        const cardTitle = template.querySelector('.card__name');
        const cardImage = template.querySelector('.card__image');

        cardTitle.textContent = this._name;
        cardImage.alt = this._name;
        cardImage.src = this._image;
        
        return template;
    };
}


initialCards.forEach((item) => {
    const card = new Card(item, '.template');

    const preparedCard = card.generateCard();

    document.querySelector('.cards__list').append(preparedCard);
});