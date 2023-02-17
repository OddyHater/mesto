import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._cardName = this._popupForm.querySelector('.popup__input_type_name');
    this._cardLink = this._popupForm.querySelector('.popup__input_type_description');
  };

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    return {
      name: this._cardName.value,
      link: this._cardLink.value
    }
  }

  setEventListeners() {
    super.setEventListeners();

    
    this._popupForm.addEventListener('submit', (evt) => {
      this._submitCallBack(evt, this._getInputValues());

      this._getInputValues();
      this.close()
    });
  }
}