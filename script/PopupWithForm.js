import Popup from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  };

  close() {
    super.close();
    this._popup.reset();
  }

  _getInputValues() {
    this._inputList.forEach(inputElement => {
      value[inputElement] = inputElement.value;
    });
    return value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitCallBack();
  }
}