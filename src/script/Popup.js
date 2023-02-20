export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');

    this._handleEscClose = function(evt) {      
      if (evt.key == 'Escape') {          
        this.close();
      }      
    };

    this._closeByEsc = this._handleEscClose.bind(this);

  };
    //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }
    //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }
    //Закрытие на esc
  
    //Добавляем слушатель закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup')) {
        this.close();
      }
    });
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}