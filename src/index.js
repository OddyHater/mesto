import './pages/index.css';

import { Api } from './script/Api.js';
import { Card } from './script/Card.js';
import { FormValidator } from './script/Validate.js';
import { Section } from './script/Section.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { PopupWithDelete } from './script/PopupWithDelete';
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

//New card popup
const popupNewCard = document.querySelector('#popup-new-card');
const popUpNewCardButton = document.querySelector('.profile__add-button');
//New card popup

//Edit profile elements
const editProfilePopup = document.querySelector('#popup-edit-avatar');
const editAvatarButton = document.querySelector('.profile__avatar-edit');
//Edit profile elements

const apiOptions = {  
  headers: {
    authorization: '49fa0164-6f79-4747-b9b7-a7fde6f409fd',
    'Content-type': 'application/json'
  }
};

const api = new Api(apiOptions);

api.getProfileInfo()
  .then(data => {    
    userInfo.setUserInfo(data);
  })
  .catch((err) => console.log(err));



async function renderCards() {
  try {
    const data = await api.getInitialCards();   //получаем объекты карточек

    data.forEach(card => {
      const cardToRender = createCard(card); //формируем разметку
      
      cardsContainer.addItem(cardToRender); // добавляем карточку в разметку      
    });
  } catch {
    console.error(error);
  }
};

//Колбеки для передачи в конструктор класса
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);  
};

function trasherCallback(cardID, evt, card) {
  popupWithDeleteCard.open(cardID, card);
};

function cardLikeCallback(evt, card, cardId) {
  if(evt.target.classList.contains('like_active')) {
    api.removeLike(cardId)
      .then(res => {
        if(res) {
          card.toggleLikeNumber(true);
          card.clickLike();
        }
      })      
      .catch(err => console.log(err));
  } else {    
    api.addLike(cardId)
      .then(res => {
        if(res) {
          card.toggleLikeNumber(false);
          card.clickLike();
        }
      })
      .catch(err => console.log(err));
  }
};

function createCard(cardData) {  
  const card = new Card (
    cardData,
    '.template',
    handleCardClick,
    (evt) => {
      trasherCallback(cardData.id, evt, card);
    },
    (evt) => {
      cardLikeCallback(evt, card, cardData.id);
    },
    userInfo.getUserInfo().userId);
  return card.generateCard(); //возращение разметки
};
//Колбеки для передачи в конструктор класса


//Классы----------------------------------------
const cardsContainer = new Section({ 
  items: [],
  renderer: (element) => {
    cardsContainer.addItem(element);
  }
}, '.cards__list');

const popupWithDeleteCard = new PopupWithDelete( 
  '#popup-delete',
  (cardId, card) => {
    api.removeCardFromServer(cardId)
      .then(res => {
        if(res) {
          card.deleteCard();
          popupWithDeleteCard.close();
        }
      }); //колбек сабмита
});

const popupAvatar = new PopupWithForm({
  popupSelector: '#popup-edit-avatar',
  submitCallBack: (item) => {
    api.changeAvatar(item.link)
      .then(res => {
        popupAvatar.close();
        userInfo.setAvatar(item.link);
      })
      .finally(() => popupAvatar.renderLoading(true));
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: '#popup-new-card',
  submitCallBack: (item) => {   //В классе PopupWithForm вместо item попадает getInputValues()
    api.pushCardToServer(item.name, item.link, item.likes, item._id)
      .then(res => {
        item['id'] = res._id;
        const card = createCard(item);

        cardsContainer.addItemReverse(card);
        newCardPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => newCardPopup.renderLoading(true));
   }
});

const profilePopup = new PopupWithForm({
  popupSelector: '#popup-profile',
  submitCallBack: (item) => {    //В классе PopupWithForm вместо item попадает getInputValues()
    api.changeProfileInfo(item)
      .then(res => {
        userInfo.setUserDescription(item);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => profilePopup.renderLoading(true))
  }
});

const imagePopup = new PopupWithImage('.popup-image');

const userInfo = new UserInfo({  //Следим за состоянием имени и описания профиля
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const validatorAtNewCard = new FormValidator(validationSettings, popupNewCard); //Подключаем Валидатор
const validatorAtEditorCard = new FormValidator(validationSettings, editProfilePopup);
//Классы----------------------------------------


//форма добавления новых карточек
function setPopupWithForm() {
  validatorAtNewCard.disableSubmitButton();
  newCardPopup.open();
}
// форма добавления новых карточек

// форма профиля 
function setPopupProfile() {
  const userInfoObj = userInfo.getUserInfo();
  
  popUpProfileEditName.value = userInfoObj.userName;
  popUpProfileEditDescription.value = userInfoObj.userDescription;
  profilePopup.open();
}
// форма профиля 

function setEditAvatar() {
  validatorAtEditorCard.disableSubmitButton(); //дизейблим кнопку при открытии 
  popupAvatar.open();
}


//Добавляем обработчики для открытия нужных попапов
popUpProfilOpenButton.addEventListener('click', setPopupProfile);
popUpNewCardButton.addEventListener('click', setPopupWithForm);
editAvatarButton.addEventListener('click', setEditAvatar);
//Добавляем обработчики для открытия нужных попапов

const validators = new Map();
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((form) => {  //создаем ключ/значение в Map и поключаем валидатор к соотв. форме
  const validator = new FormValidator(validationSettings, form);
  validators.set(form.name, validator);
  validator.enableValidation();
});

//Вешаем обработчики на popup'ы
imagePopup.setEventListeners();
newCardPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
//Вешаем обработчики на popup'ы

renderCards();