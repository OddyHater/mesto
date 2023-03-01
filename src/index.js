import './pages/index.css';

import { Api } from './script/Api.js';
import { Card } from './script/Card.js';
import { FormValidator } from './script/Validate.js';
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
      popUpName = document.querySelector('.profile__name'),
      popUpDescription = document.querySelector('.profile__description'),
      popUpProfileEditName = popUpProfile.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUpProfile.querySelector('.popup__input_type_description');
//Profile popup     

const popupNewCard = document.querySelector('#popup-new-card');
const popUpNewCardButton = document.querySelector('.profile__add-button');      


const handleCardClick = (name, link) => {
  imagePopup.open(name, link);  
}

const api = new Api('a85e5fd1-766e-427c-ac2c-de92362af89e');


function createCard(cardData) {  
  const card = new Card (cardData, '.template', handleCardClick, () => {
    api.removeCardFromServer(cardData.id);
  });
  return card.generateCard(); //возращение разметки 
}

const appender = new Section({
  items: [],
  renderer: (element) => {
    appender.addItem(element);
  }
}, '.cards__list');

const imagePopup = new PopupWithImage('.popup-image');

const inputValuesChecker = new UserInfo({  //Следим за состоянием имени и описания профиля
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});


const newCardPopup = new PopupWithForm({ 
  popupSelector: '#popup-new-card',
  submitCallBack: (item) => {    
    api.pushCardToServer(item.name, item.link, item.likes)
      .then(res => {        
        const card = createCard(item);
        appender.addItemReverse(card);        
      })
      .catch(err => console.log(err));
  }
});

const profilePopup = new PopupWithForm({
  popupSelector: '#popup-profile',
  submitCallBack: (item) => {
    console.log(item);
    api.changeProfileInfo(item)
      .then(res => {
        console.log(res);
        inputValuesChecker.setUserInfo(item);
      })      
      .catch(err => {
        console.log(err);
      })
    
  }
});

const addCardValidator = new FormValidator(validationSettings, popupNewCard)

// форма добавления новых карточек
function setPopupWithForm() {
  addCardValidator.disableSubmitButton();
  newCardPopup.open();
}
// форма добавления новых карточек

// форма профиля 
function setPopupProfile() {
  const userInfo = inputValuesChecker.getUserInfo();
  
  popUpProfileEditName.value = userInfo.userName;
  popUpProfileEditDescription.value = userInfo.userDescription;
  profilePopup.open();
   //Добавляем обработчики
}
// форма профиля 

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', setPopupProfile);
popUpNewCardButton.addEventListener('click', setPopupWithForm);

const validators = new Map();
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((form) => {  //создаем ключ/значение в Map и поключаем валидатор к соотв. форме
  const validator = new FormValidator(validationSettings, form);
  validators.set(form.name, validator);
  validator.enableValidation();
});

appender.renderItems();
imagePopup.setEventListeners();
newCardPopup.setEventListeners();
profilePopup.setEventListeners();


api.getInitialCards()
  .then(cards => {    
    cards.forEach(card => {
      const cardToRender = (createCard(card));

      appender.addItem(cardToRender);
    })
  })


api.getProfileInfo()
  .then(data => {
    console.log(data);
    popUpName.textContent = data.name;
    popUpDescription.textContent = data.about;
  }); 