import {Card} from './Card.js';
import { FormValidator } from './Validate.js';
import { initialCards } from './initalCards.js';
import { Section } from './Section.js';

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

const popUpImage = document.querySelector('#popup-image'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image'),
      popUpImageCaption = popUpImage.querySelector('.popup-image__caption');

//Create new card popup
const popUpNewCardButton = document.querySelector('.profile__add-button'),
      popUpNewCard = document.querySelector('#popup-new-card'),
      popUpNewCardForm = popUpNewCard.querySelector('#popup-add'),
      newCardName = popUpNewCardForm.querySelector('.popup__input_type_name'),
      newCardImage = popUpNewCardForm.querySelector('.popup__input_type_description');
//Create new card popup
const cardList = document.querySelector('.cards__list');

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

function handleOpenPopup(name, link) {
  popUpImagePicture.src = link;
  popUpImagePicture.alt = name;
  popUpImageCaption.textContent = name;
  
  openPopUp(popUpImage);
};


buttonCloseList.forEach((button) => {
  const popUp = button.closest('.popup');

  button.addEventListener('click', () => closePopUp(popUp));
});

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', function() {
  popUpProfileEditName.value = profileName.textContent;
  popUpProfileEditDescription.value = profileDescription.textContent;
  openPopUp(popUpProfile);
});

popUpNewCardButton.addEventListener('click', function() {
  popUpNewCardForm.reset();
  validators.get(popUpNewCardForm.name).disableSubmitButton();
  openPopUp(popUpNewCard);
});

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
  const card = new Card (cardData, '.template', handleOpenPopup);
  return card.generateCard();
}

//Рендер Новых карт
function renderNewCard (evt) {
  evt.preventDefault();
  
  cardList.prepend(createCard({name: newCardName.value, link: newCardImage.value}));
  closePopUp(popUpNewCard);
};
//Рендер Новых карт

popUpProfileForm.addEventListener('submit', formProfileSubmitHandler); 

popUpNewCardForm.addEventListener('submit', renderNewCard);


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