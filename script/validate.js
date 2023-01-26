class FormValidator {
  constructor(settingsObject, formTemplate) {
    this._settings = settingsObject;
    this._formTemplate = document.querySelector(formTemplate);  
  }

  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${settings.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${settings.errorClass}`);
  };

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(`${settings.inputErrorClass}`);
    errorElement.textContent = '';
    errorElement.classList.remove(`${settings.errorClass}`);
  };

  _hasInvalidInput(inputList) {
    return inputList.some(inputItem => {
      return !inputItem.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement, settings) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${settings.inactiveButtonClass}`)
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  _isValid(formElement, inputElement, settings) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
    const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, settings);
        this._toggleButtonState(inputList, buttonElement, settings);
      })
    });
  }

  enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));

    formList.forEach(formElement => {
      this._setEventListeners(formElement, settings);
    });
  };
}

export {FormValidator};

