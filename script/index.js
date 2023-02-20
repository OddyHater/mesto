import { Card } from './Card.js';
import { FormValidator } from './Validate.js';
import { initialCards } from './initalCards.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const validationSettings = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'profile-name-error_active'
};

//Profile popup
const popUpProfilOpenButton = document.querySelector('.profile__edit-button'),
      popUpProfile = document.querySelector('#popup-profile'),
      popUpProfileForm = popUpProfile.querySelector('.popup__form'),
      popUpProfileEditName = popUpProfile.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUpProfile.querySelector('.popup__input_type_description'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');
//Profile popup     

//Create new card popup
const popUpNewCardButton = document.querySelector('.profile__add-button'),
      cardList = document.querySelector('.cards__list');
//Create new card popup

const buttonCloseList = document.querySelectorAll('.popup__close-button'); 

function closeOnEscKey(evt) { 
  if (evt.key == 'Escape') {
    const visiblePopUp = document.querySelector('.popup_opened');

    closePopUp(visiblePopUp);
  }
};

//Отрытие/закрытие попапов
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscKey);
};

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscKey);
};
//Отрытие/закрытие попапов

function popupWithFormSet() {
  const popupWithForm = new PopupWithForm('#popup-new-card', (evt) => {
   evt.preventDefault();
   
   
   cardList.prepend(createCard(popupWithForm._getInputValues()));
   popupWithForm.close();
  });

  popupWithForm.setEventListeners();
  popupWithForm.open();  
}

function popupProfileSet() {
  const inputValuesChecker = new UserInfo({
    userNameSelector: '.profile__name', 
    userDescriptionSelector: '.profile__description'
  });

  const formPopup = new PopupWithForm('#popup-profile', (evt, submitCallBack) => {
    evt.preventDefault();

    inputValuesChecker.setUserInfo(submitCallBack);
  });

  // inputValuesChecker.setInputValue(
  //   popUpProfileEditName,
  //   popUpProfileEditDescription
  // );

  formPopup.open();
  formPopup.setEventListeners();
}

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', popupProfileSet);

popUpNewCardButton.addEventListener('click', popupWithFormSet);

function addPopUpEventListener() {
  const popUpList = Array.from(document.querySelectorAll('.popup'));

  popUpList.forEach((popUp) => { 
    popUp.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup')) {
        closePopUp(popUp);
      };
    });
  });
};

addPopUpEventListener();

function formProfileSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = popUpProfileEditName.value;
  profileDescription.textContent = popUpProfileEditDescription.value;

  closePopUp(popUpProfile);
};

function createCard(cardData) {
  const handleCardClick = (name, link) => {
    const makeImageOpen = new PopupWithImage('.popup-image');
    makeImageOpen.open(name, link);
    makeImageOpen.setEventListeners();
  }
  
  const card = new Card (cardData, '.template', handleCardClick);
  return card.generateCard();
}

//Рендер Новых карт

//Рендер Новых карт

//подключение валидации
const validators = new Map();
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validators.set(form.name, validator);
  validator.enableValidation();
});

const elementList = new Section({
  items: initialCards.map(element => {
    const cardArray = createCard(element);
    return cardArray;
  }),
  renderer: (element, nodeSelector) => {
    nodeSelector.append(element);
  }
}, '.cards__list');

elementList.addItem();

