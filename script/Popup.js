export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    };

    //открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    //Ззакрытие на esc
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {          
          this.close();
        }
    }

    //Добавляем слушатель закрытия попапа
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains('popup')) {
                this.close();
              }
        });
    }
}