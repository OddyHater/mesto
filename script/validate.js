const values = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'profile-name-error_active'
} 

class FormValidator {
  constructor(settingsObject, formTemplate) {
    this._settings = settingsObject;
    this._formTemplate = document.querySelector(formTemplate);  
  }

  _showInputError(formElement, inputElement, errorMessage, settings) {
    this._formElement = formElement;
    this._inputElement = inputElement;
    this.settings = settings;
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${settings.inputErrorClass}`);    
    this._errorElement.classList.add(`${settings.errorClass}`);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, formInput, settings) {
    this._formElement = formElement;
    this._formInput = formInput;
    this._settings = settings;
    this._errorElement = formElement.querySelector(`.${this._formInput.id}-error`);

    console.log(this._formElement);

    this._formInput.classList.remove(`${this._settings.inputErrorClass}`);    
    this._errorElement.classList.remove(`${this._settings.errorClass}`);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {  
    this._inputList = inputList  
    return this._inputList.some((item) => {
      return !item.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    this._inputList = inputList;
    this._settings = settings
    this._buttonElement = buttonElement;

    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(`${this._settings.inactiveButtonClass}`);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(`${this._settings.inactiveButtonClass}`);
      this._buttonElement.removeAttribute('disabled', true);
    }
  }
  
  _isValid(formElement, inputElement, settings) {
    this._formElement = formElement;
    this._inputElement = inputElement;
    this._settings = settings;

    if(!inputElement.validity.valid) {
      this._showInputError(this._formElement, this._inputElement, this._inputElement.validationMessage, this._settings);
    } else {
      this._hideInputError(this._formElement, this._inputElement, this._settings);
    }
  }

  _setEventListeners(formElement, settings) {
    this._formElement = formElement;
    this._settings = settings;  
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._settings.inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`${this._settings.submitButtonSelector}`);

    console.log(this._formElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement, this._settings);
        this._toggleButtonState(this._inputList, this._buttonElement, this._settings);  
      });
    });
  }

  enableValidation() {
  this._formList = Array.from(document.querySelectorAll(`${this._settings.formSelector}`));

    this._formList.forEach((formElement) => {
      this._formElement = formElement
      this._setEventListeners(this._formElement, this._settings);    
    });
  }

}

const formList = document.querySelectorAll('.popup__form');

formList.forEach(formItem => {
  const form = new FormValidator(values, '.popup__form');

  form.enableValidation();
});
