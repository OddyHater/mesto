import { Popup } from "./Popup";

export class PopupWithDelete extends Popup {
    constructor(popupSelector, buttonClickCallback, card) {
        super(popupSelector);
        this._buttonClickCallback = buttonClickCallback;
        this._button = this._popup.querySelector('.popup-delete__submit');
        this._card = card;
    }

    open(id, card) {
        this._id = id;
        this._card = card;
        
        super.open();
    }

    removeCard(card) {
        card.remove();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._button.addEventListener('click', () => {
            this._buttonClickCallback(this._id);

            this.removeCard(this._card);
            this.close();
        });
    }
}