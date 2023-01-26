import {Card} from './Card.js';
import { FormValidator } from './validate.js';

const values = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'profile-name-error_active'
}
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
      popUpNewCard = document.querySelector('#popup-new-card'),
      popUpNewCardForm = popUpNewCard.querySelector('#popup-add'),
      popUpNewCardSubmitButton = popUpNewCardForm.querySelector('.popup__submit'),
      newCardName = popUpNewCardForm.querySelector('.popup__input_type_name'),
      newCardImage = popUpNewCardForm.querySelector('.popup__input_type_description');
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
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscKey);
}
//Отрытие/закрытие попапов

buttonCloseList.forEach((button) => {
  const popUp = button.closest('.popup');

  button.addEventListener('click', () => closePopUp(popUp));
})

//Pop-up profile
popUpProfilOpenButton.addEventListener('click', function() {
  popUpProfileEditName.value = profileName.textContent;
  popUpProfileEditDescription.value = profileDescription.textContent;
  openPopUp(popUpProfile);
});

popUpNewCardButton.addEventListener('click', function() {
  popUpNewCardForm.reset();
  popUpNewCardSubmitButton.classList.add('popup__submit_inactive');
  popUpNewCardSubmitButton.setAttribute('disabled', true);
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
}

addPopUpEventListener();

function formProfileSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = popUpProfileEditName.value;
  profileDescription.textContent = popUpProfileEditDescription.value;
  
  closePopUp(popUpProfile);
};

//Рендер Новых карт
function renderNewCard (evt) {  
  evt.preventDefault(); 

  const newCardItem = new Card({name: newCardName.value, link: newCardImage.value}, '.template');  
  const preparedCard = newCardItem.generateCard();

  document.querySelector('.cards__list').prepend(preparedCard);

  closePopUp(popUpNewCard);
}
//Рендер Новых карт

popUpProfileForm.addEventListener('submit', formProfileSubmitHandler); 

popUpNewCardForm.addEventListener('submit', renderNewCard);


//подключение валидации
document.querySelectorAll('.popup__form').forEach(form => {
  form = new FormValidator(values, '.popup__form');

  form.enableValidation(values);
});