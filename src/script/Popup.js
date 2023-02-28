export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  };
  
  //закрытие на Esc
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {          
      this.close();
    }
  }
  
   //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');    
    document.addEventListener('keydown', this._handleEscCloseBound);
  }
    //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
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