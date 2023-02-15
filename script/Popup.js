export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    };

    //открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //Ззакрытие на esc
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this._popup.close();
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