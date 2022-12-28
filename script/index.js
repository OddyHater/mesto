const editButton = document.querySelector('.profile__edit-button'),
      popUp = document.querySelector('.popup'),
      popUpForm = popUp.querySelector('.popup__form'),
      closeButton = popUp.querySelector('.popup__close-button'),
      submitButton = popUp.querySelector('.popup__submit'),
      profileEditName = popUp.querySelector('.popup__input_type_name'),
      profileEditDescription = popUp.querySelector('.popup__input_type_description'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      pageTemplate = document.querySelector('.template'),
      cardList = document.querySelector('.cards__list');

const addCardButton = document.querySelector('.profile__add-button'),
      popUpAdd = document.querySelector('.popup-add'),
      popUpAddForm = popUpAdd.querySelector('.popup-add__form'),
      closeButtonAdd = popUpAdd.querySelector('.popup-add__close-button'),
      addCardName = popUpAddForm.querySelector('.popup-add__input_type_name'),
      addCardImage = popUpAddForm.querySelector('.popup-add__input_type_description');

const popUpImage = document.querySelector('.popup-image'),
      popUpImageCloseButton = popUpImage.querySelector('.popup-image__close-button');
      popUpImagePicture = popUpImage.querySelector('.popup-image__image');
      
const initialCards = [  
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


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
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;

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

editButton.addEventListener('click', popUpOpen);
closeButton.addEventListener('click', closePopUp);
//Profile popup

//Add Card popup
function popUpAddOpen() {
  clear();
  popUpAdd.classList.add('popup_opened');
}

function closePopUpAdd() {
  popUpAdd.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', popUpAddOpen);
closeButtonAdd.addEventListener('click', closePopUpAdd);
//Add Card popup




function clear() {
  addCardName.value = "";
  addCardImage.value = "";
}

function formSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  
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

  cardImage.setAttribute('src', addCardImage.value);
  cardTitle.textContent = addCardName.value;
  cardImage.setAttribute('alt', addCardImage.value);

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

popUpAddForm.addEventListener('submit', renderNewCard);
