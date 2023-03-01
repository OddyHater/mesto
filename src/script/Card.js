class Card {
  constructor(data, templateSelector, handleCardClick, trasherCallback) {
    this._name = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._trasherCallback = trasherCallback;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(`${this._templateSelector}`)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  };

  _clickLike() {
    this._likeButton.classList.toggle('like_active');  
  };

  _deleteCard() {    
    this._cardElement.remove();
  }

  _addLikeListener() {
    this._likeButton = this._cardElement.querySelector('.card__like');

    this._likeButton.addEventListener('click', () => {
      this._clickLike();
    });
  };

  _addTrashListener() {
    this._trashButton = this._cardElement.querySelector('.card__trash-button');

    this._trashButton.addEventListener('click', () => {
      this._trasherCallback()
      this._deleteCard();
    });
  };

  _addOpenImagePopupListener() { // Навешиваем обработчик, приходящий из handleCardClick
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._imageLink);
    });  
  };

  generateCard() {
    this._cardElement = this._getTemplate(); //Подставляем нужные значения.
    this._cardTitle = this._cardElement.querySelector('.card__name');
    this._cardImage = this._cardElement.querySelector('.card__image');

    this._addLikeListener();
    this._addTrashListener();
    this._addOpenImagePopupListener();

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._imageLink;   

    return this._cardElement; //Возвращаем разметку карточки.
  };
}

export { Card };