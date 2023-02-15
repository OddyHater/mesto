import { Popup } from './Popup';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = this._popup.querySelector('.popup-image__image');
        this._popupCaption = this._popup.querySelector('.popup-image__caption');
    };

    open() {
        this._popupPicture.src = '';
        this._popupPicture.alt = '';
        this._popupCaption.textContent = '';
    };

    
};