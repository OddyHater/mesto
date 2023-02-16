import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  };

  close() {
    super(this.close);
    this._popup.reset();
  }

  _getInputValues() {

  }

  setEventListeners() {
    super(this.setEventListeners);
    this._submitCallBack();
  }
}