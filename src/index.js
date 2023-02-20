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

//Create new card popup
const popUpNewCardButton = document.querySelector('.profile__add-button'),
      cardList = document.querySelector('.cards__list');
//Create new card popup

// форма добавления новых карточек
function popupWithFormSet() {
  const popupWithForm = new PopupWithForm('#popup-new-card', (evt) => {
   evt.preventDefault();   
   
   cardList.prepend(createCard(popupWithForm._getInputValues()));//генерация карточки из возвращаемного объекта getInputValues                                                                    
   popupWithForm.close();
  });

  popupWithForm.setEventListeners(); //Добавляем обработчики
  popupWithForm.open();
}
// форма добавления новых карточек

// форма профиля 
function popupProfileSet() {
  const inputValuesChecker = new UserInfo({  //Следим за состоянием имени и описания профиля
    userNameSelector: '.profile__name', 
    userDescriptionSelector: '.profile__description'
  });

  const formPopup = new PopupWithForm('#popup-profile', (evt, submitCallBack) => {
    evt.preventDefault();

    inputValuesChecker.setUserInfo(formPopup._getInputValues()); //меняем имя и описания при отправке формы профля
    formPopup.close();
  });

  inputValuesChecker.setInputValue(popUpProfileEditName, popUpProfileEditDescription); //при открытии формы значения инпутов равны описанию на странице
  formPopup.open();
  formPopup.setEventListeners(); //Добавляем обработчики
}
// форма профиля 

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', popupProfileSet);

popUpNewCardButton.addEventListener('click', popupWithFormSet);

function createCard(cardData) {
  const handleCardClick = (name, link) => {
    const makeImageOpen = new PopupWithImage('.popup-image');
    makeImageOpen.open(name, link);
    makeImageOpen.setEventListeners();
  }
  
  const card = new Card (cardData, '.template', handleCardClick);
  return card.generateCard(); //возращение разметки 
}

const validators = new Map(); //подключение валидации
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((form) => {  //создаем ключ/значение в Map и поключаем валидатор к соотв. форме
  const validator = new FormValidator(validationSettings, form);
  validators.set(form.name, validator);
  validator.enableValidation();
});

const elementList = new Section({ //Отрисовываем карточки приходящие из createCard
  items: initialCards.map(element => {
    const cardArray = createCard(element);
    return cardArray;
  }),
  renderer: (element, nodeSelector) => {
    nodeSelector.append(element);
  }
}, '.cards__list');

elementList.addItem(); 

