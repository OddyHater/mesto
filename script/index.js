import {initialCards} from './cards.js';

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

//Open card image popup
const popUpImage = document.querySelector('#popup-image'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image'),
      popUpImageCaption = popUpImage.querySelector('.popup-image__caption');
//Open card image popup

const  pageTemplate = document.querySelector('.template'),
       cardsContainer = document.querySelector('.cards__list'),
       buttonCloseList = document.querySelectorAll('.popup__close-button'); 


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

function addLikeListener(likeButton) {               //лайк карточки  
  likeButton.classList.toggle('like_active');
};

function addTrashListener(trashButton) {            //удаление по кнопке  
  const listItem = trashButton.closest('.card');

  listItem.remove();  
};

function addOpenImagePopUp(cardData) {        //открытие поп-апа с картинкой при клике 

  popUpImagePicture.src = cardData.link;
  popUpImagePicture.alt = cardData.name;
  popUpImageCaption.textContent = cardData.name;

  openPopUp(popUpImage);
};
//Функции - навешиватели прослушивания


//Объединяем прослушиватели в одну функцию
function addCardEventListeners(trashButton, likeButton, imageElement, cardData) {
  trashButton.addEventListener('click', () => addTrashListener(trashButton));
  likeButton.addEventListener('click', () => addLikeListener(likeButton));
  imageElement.addEventListener('click', () => addOpenImagePopUp(cardData));
};
//Объединяем прослушиватели в одну функцию


//Создание ноды карточки из темплейта
function createCard(cardItem) {
  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  const cardLike = cloneTemplate.querySelector('.card__like');
  const cardTrash = cloneTemplate.querySelector('.card__trash-button');

  cardImage.setAttribute('src', cardItem.link);
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;

  const cardData = {name: cardItem.name, link: cardItem.link};

  addCardEventListeners(cardTrash, cardLike, cardImage, cardData);

  return cloneTemplate;
};
//Создание ноды карточки из темплейта

function renderCard(container, card) {
  container.prepend(card);
}

//Рендер карточек из массива
initialCards.forEach(function(cardItem) {
  
  const card = createCard(cardItem);

  renderCard(cardsContainer, card); 
});
//Рендер карточек из массива

function formProfileSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = popUpProfileEditName.value;
  profileDescription.textContent = popUpProfileEditDescription.value;
  
  closePopUp(popUpProfile);
};

//Рендер Новых карт
function renderNewCard (evt) {  
  evt.preventDefault(); 

  const newCardItem = {name: newCardName.value, link: newCardImage.value};
  const card = createCard(newCardItem);

  renderCard(cardsContainer, card);   

  closePopUp(popUpNewCard);
}
//Рендер Новых карт

popUpProfileForm.addEventListener('submit', formProfileSubmitHandler); 

popUpNewCardForm.addEventListener('submit', renderNewCard);

export { popUpImage, popUpImagePicture, popUpImageCaption };