
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('profile-name-error_active');
};

const hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);


    formInput.classList.remove('popup__input_type_error');
    errorElement.classList.remove('profile-name-error_active');
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__submit_inactive');
        buttonElement.removeAttribute('disabled', true);
    }
}

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit');
    
    inputList.forEach((inputElement) => {
        
        inputElement.addEventListener('input', () => {            
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setEventListeners(formElement);        
    });    
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
