import {initialCards} from './cards.js';

const popUpProfilOpenButton = document.querySelector('.profile__edit-button'),
      popUp = document.querySelector('.popup'),
      popUpForm = popUp.querySelector('.popup__form'),
      popUpCloseButton = popUp.querySelector('.popup__close-button'),
      popUpSubmitFormButton = popUp.querySelector('.popup__submit'),
      popUpProfileEditName = popUp.querySelector('.popup__input_type_name'),
      popUpProfileEditDescription = popUp.querySelector('.popup__input_type_description'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      pageTemplate = document.querySelector('.template'),
      cardList = document.querySelector('.cards__list');

const popUpNewCardButton = document.querySelector('.profile__add-button'),
      popUpNewCard = document.querySelector('.popup-add'),
      popUpNewCardForm = popUpNewCard.querySelector('.popup-add__form'),
      newCardName = popUpNewCardForm.querySelector('.popup-add__input_type_name'),
      newCardImage = popUpNewCardForm.querySelector('.popup-add__input_type_description');

const popUpImage = document.querySelector('.popup-image'),
      popUpImageCloseButton = popUpImage.querySelector('.popup-image__close-button'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image');
      

function addLikeListener(likeButton) {
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('like_active');
  });
};

function addTrashListener(trashButton) {
  trashButton.addEventListener('click', function() {
    const listItem = trashButton.closest('.card');

    listItem.remove();
  });
};

function addOpenImagePopUp(imageElement) {
  imageElement.addEventListener('click', function(evt) {
    popUpImagePicture.src = evt.target.src;
    popUpImage.classList.add('popup-image_opened');
  }); 
}

function addEventListeners(trashButton, likeButton, imageElement) {
  addTrashListener(trashButton);
  addLikeListener(likeButton);
  addOpenImagePopUp(imageElement);  
};

//Рендер карточек из массива
initialCards.forEach(function(item) {
  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  const cardLike = cloneTemplate.querySelector('.card__like');
  const cardTrash = cloneTemplate.querySelector('.card__trash-button');
  
  
  cardImage.setAttribute('src', item.link);
  cardTitle.textContent = item.name;
  cardImage.setAttribute('alt', item.name);

  addEventListeners(cardTrash, cardLike, cardImage);


  popUpImageCloseButton.addEventListener('click', function() {
    popUpImage.classList.remove('.popup-image_opened');
  });
 

  cardList.prepend(cloneTemplate); 
  
  
});
//Рендер карточек из массива


//Profile popup
function popUpOpen() {  
  popUpProfileEditName.value = profileName.textContent;
  popUpProfileEditDescription.value = profileDescription.textContent;

  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
} 

function openPopUpImage (element) {
  element.addEventListener('click', function(evt) {
    
    popUpImagePicture.src = evt.target.src;
    // popUpImage.classList.toggle('popup-image_opened');
  });
};

popUpProfilOpenButton.addEventListener('click', popUpOpen);
popUpCloseButton.addEventListener('click', closePopUp);
//Profile popup

//Add Card popup
function popUpAddOpen() {
  clear();
  popUpNewCard.classList.add('popup_opened');
}

function closePopUpAdd() {
  popUpNewCard.classList.remove('popup_opened');
}

popUpNewCardButton.addEventListener('click', popUpAddOpen);
//Add Card popup


function clear() {
  newCardName.value = "";
  newCardImage.value = "";
}

function formSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = popUpProfileEditName.value;
  profileDescription.textContent = popUpProfileEditDescription.value;
  
  closePopUp();

}


//Рендер Новых карт
function renderNewCard (evt) {  
  evt.preventDefault(); 

  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  const cardLike = cloneTemplate.querySelector('.card__like');
  const cardTrash = cloneTemplate.querySelector('.card__trash-button');

  cardImage.setAttribute('src', newCardImage.value);
  cardTitle.textContent = newCardName.value;
  cardImage.setAttribute('alt', newCardImage.value);

  addEventListeners(cardTrash, cardLike, cardImage);
  
  cardList.prepend(cloneTemplate);  
  
  closePopUpAdd();

}
//Рендер Новых карт

const cardImage = document.querySelectorAll('.card__image');

cardImage.forEach(function(item) {
  openPopUpImage(item);
});

popUpImageCloseButton.addEventListener('click', function() {
  popUpImagePicture.src = "";
  popUpImage.classList.remove('popup-image_opened');
});

popUpForm.addEventListener('submit', formSubmitHandler); 

popUpNewCardForm.addEventListener('submit', renderNewCard);
