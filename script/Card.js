import { initialCards } from "./cards.js";

const popUpImage = document.querySelector('#popup-image'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image'),
      popUpImageCaption = popUpImage.querySelector('.popup-image__caption');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(`${this._templateSelector}`)
      .content.cloneNode(true);
    return cardTemplate;
  };

  _addLikeListener(template) {
    this._likeButton = template.querySelector('.card__like');

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('like_active');
    });
  };

  _addTrashListener(template) {
    this._trashButton = template.querySelector('.card__trash-button');
    this._cardElement = this._trashButton.closest('.card');

    this._trashButton.addEventListener('click', () => {
      this._cardElement.remove();
    });
  };

  _addOpenImagePopupListener(template) {
    this._picture = template.querySelector('.card__image');

    this._picture.addEventListener('click', () => {
      popUpImagePicture.src = this._image;
      popUpImagePicture.alt = this._name;
      popUpImageCaption.textContent = this._name;
      popUpImage.classList.add('popup_opened');  
    });
  
  };

  generateCard() {
    this._template = this._getTemplate().querySelector('.card');
    this._cardTitle = this._template.querySelector('.card__name');
    this._cardImage = this._template.querySelector('.card__image');

    this._addLikeListener(this._template);
    this._addTrashListener(this._template);
    this._addOpenImagePopupListener(this._template);

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._image;

    return this._template;
  };
}

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const preparedCard = card.generateCard();

  document.querySelector('.cards__list').append(preparedCard);
});

export { Card }