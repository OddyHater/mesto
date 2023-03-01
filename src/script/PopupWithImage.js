import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup-image__image');
    this._popupCaption = this._popup.querySelector('.popup-image__caption');
  };

  open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupCaption.textContent = name;

    super.open();
  };  
};