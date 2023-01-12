import {initialCards} from './cards.js';

//Profile popup
const popUpProfilOpenButton = document.querySelector('.profile__edit-button'),
      popUpProfile = document.querySelector('#popup-profile'),
      popUpProfileForm = popUpProfile.querySelector('.popup__form'),
      popUpProfileEditName = popUpProfile.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUpProfile.querySelector('.popup__input_type_description'),
      popUpProfileCloseButton = popUpProfile.querySelector('.popup__close-button'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');
//Profile popup     

//Create new card popup
const popUpNewCardButton = document.querySelector('.profile__add-button'),      
      popUpNewCard = document.querySelector('#popup-new-card'),
      popUpNewCardCloseButton = popUpNewCard.querySelector('.popup__close-button'),
      popUpNewCardForm = popUpNewCard.querySelector('#popup-add'),
      newCardName = popUpNewCardForm.querySelector('.popup__input_type_name'),
      newCardImage = popUpNewCardForm.querySelector('.popup__input_type_description');
//Create new card popup

//Open card image popup
const popUpImage = document.querySelector('#popup-image'),
      popUpImageCloseButton = popUpImage.querySelector('.popup-image__close-button'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image'),
      popUpImageCaption = popUpImage.querySelector('.popup-image__caption');
//Open card image popup

const 
       pageTemplate = document.querySelector('.template'),
       cardList = document.querySelector('.cards__list');


function closeOnEscKey(evt) {
  const visiblePopUp = document.querySelector('.popup_opened');
 
  if (evt.key == 'Escape') {
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


//Pop-up profile
popUpProfilOpenButton.addEventListener('click', function() {
  popUpProfileEditName.value = profileName.textContent;
  popUpProfileEditDescription.value = profileDescription.textContent;
  openPopUp(popUpProfile);
});

popUpProfileCloseButton.addEventListener('click', function() {
  closePopUp(popUpProfile);
});

popUpNewCardButton.addEventListener('click', function() {
  popUpNewCardForm.reset();
  openPopUp(popUpNewCard);
});

popUpNewCardCloseButton.addEventListener('click', function() {
  closePopUp(popUpNewCard);
});

popUpImageCloseButton.addEventListener('click', function() {
  closePopUp(popUpImage);

  popUpImageCloseButton.classList.add('popup-image__close-button-inactive');
}); 

//Функции - навешиватели прослушивания
function addLikeListener(likeButton) {               //лайк карточки
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('like_active');
  });
};

function closeOnOverlay(popUp) {
  const popUpContainer = popUp.querySelector('.popup__container');
  popUp.addEventListener('click', (evt) => {
    const isModuleWindow = evt.composedPath().includes(popUpContainer); //если в пути ивента нет контейнера, то закрываем попап

      if(!isModuleWindow) {
        closePopUp(popUp);
      }
  });
}

function addPopUpEventListener() {
  const popUpList = Array.from(document.querySelectorAll('.popup'));

  popUpList.forEach((popUp) => { 
    popUp.addEventListener('click', closeOnOverlay(popUp));
  });
}

addPopUpEventListener();
 
function addTrashListener(trashButton) {            //удаление по кнопке
  trashButton.addEventListener('click', function() {
    const listItem = trashButton.closest('.card');

    listItem.remove();
  });
};

function addOpenImagePopUp(imageElement) {        //открытие поп-апа с картинкой при клике 
  imageElement.addEventListener('click', function(evt) {
    popUpImagePicture.src = "";
    popUpImagePicture.src = evt.target.src;
    popUpImagePicture.alt = evt.target.alt;
    popUpImageCaption.textContent = evt.target.alt;

    openPopUp(popUpImage);

    popUpImageCloseButton.classList.remove('popup-image__close-button-inactive');    
  }); 
};
//Функции - навешиватели прослушивания


//Объединяем прослушиватели в одну функцию
function addCardEventListeners(trashButton, likeButton, imageElement) {

  addTrashListener(trashButton);
  addLikeListener(likeButton);
  addOpenImagePopUp(imageElement); 
};
//Объединяем прослушиватели в одну функцию


//Создание ноды карточки из темплейта
function createCard(cardName, cardSrc) {
  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  const cardLike = cloneTemplate.querySelector('.card__like');
  const cardTrash = cloneTemplate.querySelector('.card__trash-button'); 

  cardImage.setAttribute('src', cardSrc);
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  addCardEventListeners(cardTrash, cardLike, cardImage);

  return cloneTemplate;
};
//Создание ноды карточки из темплейта


function renderCard(container, card) {
  container.prepend(card);
}


//Рендер карточек из массива
initialCards.forEach(function(item) {
  
  const card = createCard(item.name, item.link);

  renderCard(cardList, card); 
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

  const card = createCard(newCardName.value, newCardImage.value);

  renderCard(cardList, card);   

  closePopUp(popUpNewCard);
}
//Рендер Новых карт

popUpProfileForm.addEventListener('submit', formProfileSubmitHandler); 

popUpNewCardForm.addEventListener('submit', renderNewCard);