import { Popup } from "./Popup";

export class PopupWithDelete extends Popup {
    constructor(popupSelector, buttonClickCallback, card) {
        super(popupSelector);
        this._buttonClickCallback = buttonClickCallback;
        this._button = this._popup.querySelector('.popup-delete__submit');
        this._card = card;
    }

    open(id, card) {
        this._id = id;    //при открытии получаем id и разметку удаляемой капрточки
        this._card = card;
        
        super.open();
    }

    removeCard(card) {
        card.remove();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._button.addEventListener('click', () => {
            this._buttonClickCallback(this._id); //передаем id в колбек
            this.removeCard(this._card); //передаем разметку карточки для удаления при сабмите

            this.close();
        });
    }
}