class Card {
  constructor(data, templateSelector, handleCardClick, trasherCallback, likeButtonCallback) {
    this._name = data.name;
    this._imageLink = data.link;
    this._likesNumber = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._trasherCallback = trasherCallback;
    this._likeButtonCallback = likeButtonCallback;    
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
    this._cardElement.remove(); // что значит зануллить? 
  }

  _addLikeListener() {
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._likesNumberElement = this._cardElement.querySelector('.card__like-number');

    this._likeButton.addEventListener('click', (evt) => {
      this._likeButtonCallback(evt);

      if (evt.target.classList.contains('like_active')) {
        this._likesNumberElement.textContent = Number(this._likesNumberElement.textContent) - 1;
      } else {
        this._likesNumberElement.textContent = Number(this._likesNumberElement.textContent) + 1;
      }
      
      this._clickLike();
    });
  };

  _addTrashListener() {
    this._trashButton = this._cardElement.querySelector('.card__trash-button');

    this._trashButton.addEventListener('click', (evt) => {
      this._trasherCallback(evt);
    });
  };

  _showHowManyLikes() {
    this._likesNumberElement = this._cardElement.querySelector('.card__like-number');
    if(this._likesNumber) {
      this._likesNumberElement.textContent = this._likesNumber;
    } else {
      this._likesNumberElement.textContent = '0';      
    }  
  }

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
    this._showHowManyLikes();
    this._addOpenImagePopupListener();

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._imageLink;

    return this._cardElement; //Возвращаем разметку карточки.
  };
}

export { Card };