import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallBack}) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__submit')
    this._submitButtonText = this._submitButton.textContent;
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    super.open();

    this.renderLoading(false);
  }

  close() {
    super.close();

    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._submitCallBack); //навешиваем обработчик, приходящий из submitCallBack
  }

  renderLoading(condition) {
    if(condition) {      
      this._submitButton.textContent = 'Сохранение...'
    } else {      
      this._submitButton.textContent = this._submitButtonText;
    }
  }


  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;      
    });

    return this._formValues;
  }
  
  //class PopupWithForm
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._submitCallBack(this._getInputValues());
    });
  }
}