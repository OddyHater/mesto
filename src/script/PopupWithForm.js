import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallBack}) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._cardName = this._popupForm.querySelector('.popup__input_type_name');
    this._cardLink = this._popupForm.querySelector('.popup__input_type_description');
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  close() {    
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._submitCallBack); //навешиваем обработчик, приходящий из submitCallBack
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitCallBack(this._getInputValues());

      this.close();
    });
  }
}