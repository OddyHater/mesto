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
      popUpName = document.querySelector('.profile__name'),
      popUpDescription = document.querySelector('.profile__description'),
      popUpProfileEditName = popUpProfile.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUpProfile.querySelector('.popup__input_type_description');
//Profile popup     

//New card popup
const popupNewCard = document.querySelector('#popup-new-card');
const popUpNewCardButton = document.querySelector('.profile__add-button');
//New card popup

//Edit profile elements
const editProfilePopup = document.querySelector('#popup-edit-avatar')
const editAvatarButton = document.querySelector('.profile__avatar-edit');
const profileAvatar = document.querySelector('.profile__avatar');
//Edit profile elements

const apiOptions = {  
  headers: {
    authorization: 'a85e5fd1-766e-427c-ac2c-de92362af89e',
    'Content-type': 'application/json'
  }
}

const api = new Api(apiOptions);

api.getProfileInfo()
  .then(data => {    
    popUpName.textContent = data.name;
    popUpDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => console.log(err)); 


//Колбеки для передачи в конструктор класса
async function renderCards() {
  try {
    const data = await api.getInitialCards();   //получаем объекты карточек
    const profileInfo = await api.getProfileInfo(); //получаем инфо профиля
    const myId = profileInfo._id;  //находим наш id
    data.forEach(card => {
      const cardToRender = createCard(card); //формируем разметку
      const cardTrashButton = cardToRender.querySelector('.card__trash-button');
      const cardLikeElement = cardToRender.querySelector('.card__like');
      if(card.owner !== myId) { // Если карточка не наша, то удаляем иконку корзины
        cardTrashButton.remove();
      }
      card.likesArr.forEach((like) => {
        if(like._id === myId) { //если мы лайкнули карточку, то отрисовываем с закрашенным лайком
          cardLikeElement.classList.add('like_active');
        }
      });
      appender.addItem(cardToRender); // добавляем карточку в разметку
      
    })
  } catch {
    console.error(error);
  }
};

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);  
};

function trasherCallback(cardID, evt) {
  const card = evt.target.closest('.card'); //находим нужную карточку для удаления 
  deleteCardPopup.open(cardID, card);  
};

function cardLikeCallback(evt, cardId) {
  if(evt.target.classList.contains('like_active')) {    
    api.removeLike(cardId);
  } else {    
    api.addLike(cardId);
  }
};

function createCard(cardData) {  
  const card = new Card (
    cardData,
    '.template',
    handleCardClick,
    (evt) => {
      trasherCallback(cardData.id, evt);
    },
    (evt) => {
      cardLikeCallback(evt, cardData.id);
    });
  return card.generateCard(); //возращение разметки 
};
//Колбеки для передачи в конструктор класса


//Классы----------------------------------------
const appender = new Section({ 
  items: [],
  renderer: (element) => {
    appender.addItem(element);
  }
}, '.cards__list');

const deleteCardPopup = new PopupWithDelete( 
  '#popup-delete',
  (cardId) => {
    api.removeCardFromServer(cardId); //колбек сабмита
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: '#popup-edit-avatar',
  submitCallBack: (item) => {

    api.changeAvatar(item.link)
    profileAvatar.src = item.link;
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: '#popup-new-card',
  submitCallBack: (item) => {   //В классе PopupWithForm вместо item попадает getInputValues()
    api.pushCardToServer(item.name, item.link, item.likes)
      .then(res => {
        const card = createCard(item);
        appender.addItemReverse(card);

        window.location.reload();
      })
      .catch(err => console.log(err));
   }
});

const profilePopup = new PopupWithForm({
  popupSelector: '#popup-profile',
  submitCallBack: (item) => {    //В классе PopupWithForm вместо item попадает getInputValues()
    api.changeProfileInfo(item)
      .then(res => {        
        inputValuesChecker.setUserInfo(item);
      })      
      .catch(err => console.log(err))    
  }
});

const imagePopup = new PopupWithImage('.popup-image');

const inputValuesChecker = new UserInfo({  //Следим за состоянием имени и описания профиля
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const addCardValidator = new FormValidator(validationSettings, popupNewCard) //Подключаем Валидатор
const editProfileValidator = new FormValidator(validationSettings, editProfilePopup) 
//Классы----------------------------------------


//форма добавления новых карточек
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
}
// форма профиля 

function setEditAvatar() {
  editProfileValidator.disableSubmitButton(); //дизейблим кнопку при открытии 
  editAvatarPopup.open();
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
deleteCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
//Вешаем обработчики на popup'ы

renderCards();