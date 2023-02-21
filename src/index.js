import './pages/index.css';

import { Card } from './script/Card.js';
import { FormValidator } from './script/Validate.js';
import { initialCards } from './script/initalCards.js';
import { Section } from './script/Section.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { UserInfo } from './script/UserInfo.js';


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
      popUpProfileEditName = popUpProfile.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUpProfile.querySelector('.popup__input_type_description');
//Profile popup     

const popupNewCard = document.querySelector('#popup-new-card');
//Create new card popup
const popUpNewCardButton = document.querySelector('.profile__add-button'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      cardList = document.querySelector('.cards__list');
//Create new card popup

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
  imagePopup.setEventListeners();
}

function createCard(cardData) {  
  const card = new Card (cardData, '.template', handleCardClick);
  return card.generateCard(); //возращение разметки 
}

const cardsFromArray = new Section({ //Отрисовываем карточки из массива
  items: initialCards.map(element => {
    const cardArray = createCard(element);
    return cardArray;
  }),
  renderer: () => {
    cardsFromArray.renderItems();
  }
}, '.cards__list');

const imagePopup = new PopupWithImage('.popup-image');

const inputValuesChecker = new UserInfo({  //Следим за состоянием имени и описания профиля
  userNameSelector: '.profile__name', 
  userDescriptionSelector: '.profile__description'
});

const newCardPopup = new PopupWithForm('#popup-new-card', (evt) => {
  evt.preventDefault();
  const cardData = newCardPopup.getInputValues();  
  const preparedCard = createCard(cardData);
  const newCardsToAppend = new Section({}, '.cards__list')

  newCardsToAppend.addItem(preparedCard);
  newCardPopup.close();
});

const profilePopup = new PopupWithForm('#popup-profile', (evt) => {
  evt.preventDefault();
  const cardData = profilePopup.getInputValues()
  
  profileName.textContent = cardData.name;
  profileDescription.textContent = cardData.link;
  profilePopup.close();
});

const addCardValidator = new FormValidator(validationSettings, popupNewCard)

// форма добавления новых карточек
function popupWithFormSet() {

  addCardValidator.disableSubmitButton();
  newCardPopup.setEventListeners(); //Добавляем обработчики
  newCardPopup.open();
}
// форма добавления новых карточек

// форма профиля 
function popupProfileSet() {
  const userInfo = inputValuesChecker.getUserInfo();

  
  popUpProfileEditName.value = userInfo.userName;
  popUpProfileEditDescription.value = userInfo.userDescription;
  profilePopup.open();
  profilePopup.setEventListeners(); //Добавляем обработчики
}
// форма профиля 

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', popupProfileSet);

popUpNewCardButton.addEventListener('click', popupWithFormSet);

const validators = new Map(); //подключение валидации
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((form) => {  //создаем ключ/значение в Map и поключаем валидатор к соотв. форме
  const validator = new FormValidator(validationSettings, form);
  validators.set(form.name, validator);
  validator.enableValidation();
});

cardsFromArray.renderItems();

