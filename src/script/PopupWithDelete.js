import { Popup } from "./Popup";

export class PopupWithDelete extends Popup {
    constructor(popupSelector, buttonClickCallback, elementToDelete) {
        super(popupSelector);
        this._buttonClickCallback = buttonClickCallback;
        this._button = this._popup.querySelector('.popup-delete__submit');        
    }

    open(id, element) {
        this._id = id;    //при открытии получаем id и разметку удаляемой капрточки
        this._elementToDelete = element;
        
        super.open();
    }

    removeElement() {
        this._elementToDelete.remove();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._button.addEventListener('click', () => {
            this._buttonClickCallback(this._id); //передаем id в колбек 
            this.removeElement(this._elementToDelete);  
        });
    }
}