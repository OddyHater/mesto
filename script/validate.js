class FormValidator {
  constructor(settingsObject, formElement) {
    this._settings = settingsObject;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._formButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  };

  disableSubmitButton() {  
    this._formButton.classList.add(this._settings.inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);   
  };

  _hasInvalidInput() {
    return this._inputList.some(inputItem => {
      return !inputItem.validity.valid;
    });
  };

  _toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._formButton.classList.remove(this._settings.inactiveButtonClass);
      this._formButton.removeAttribute('disabled', true);
    }
  };

  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._settings);
    } else {
      this._hideInputError(inputElement, this._settings);
    }
  };

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      })
    });
  };

  enableValidation() {    
    this._setEventListeners(this._formElement);
  };
}

export {FormValidator};

