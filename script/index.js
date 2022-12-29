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
      popUpImageCloseButton = popUpImage.querySelector('.popup-image__close-button'),
      popUpImagePicture = popUpImage.querySelector('.popup-image__image'),
      popUpImageCaption = popUpImage.querySelector('.popup-image__caption');

      
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

//Функции - навешиватели прослушивания
function addLikeListener(likeButton) {               //лайк карточки
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('like_active');
  });
};

function addTrashListener(trashButton) {            //удаление по кнопке
  trashButton.addEventListener('click', function() {
    const listItem = trashButton.closest('.card');

    listItem.remove();
  });
};

function addOpenImagePopUp(imageElement) {        //открытие поп-апа с картинкой при клике 
  imageElement.addEventListener('click', function(evt) {
    popUpImagePicture.src = evt.target.src;
    popUpImagePicture.alt = evt.target.alt;
    popUpImage.classList.add('popup-image_opened');
    popUpImageCloseButton.classList.remove('popup-image__close-button-inactive');
    console.log(evt.target.alt);
    popUpImageCaption.textContent = evt.target.alt;
  }); 
};

function addCloseImagePopUp(closeButton) {        //закрытие поп-апа
  closeButton.addEventListener('click', function() {
    popUpImagePicture.src = "";
    popUpImage.classList.remove('popup-image_opened');
    popUpImageCloseButton.classList.add('popup-image__close-button-inactive');
  }); 
};
//Функции - навешиватели прослушивания

//Объединяем прослушиватели в одну функцию
function addEventListeners(trashButton, likeButton, imageElement, closeButton) {

  addTrashListener(trashButton);
  addLikeListener(likeButton);
  addOpenImagePopUp(imageElement); 
  addCloseImagePopUp(closeButton); 

};
//Объединяем прослушиватели в одну функцию

//Рендер карточек из массива
initialCards.forEach(function(item) {
  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  const cardLike = cloneTemplate.querySelector('.card__like');
  const cardTrash = cloneTemplate.querySelector('.card__trash-button');  
  
  cardImage.setAttribute('src', item.link);
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  
  addEventListeners(cardTrash, cardLike, cardImage, popUpImageCloseButton);

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

editButton.addEventListener('click', popUpOpen);
closeButton.addEventListener('click', closePopUp);
//Profile popup

//Add Card popup
function clear() {            //стераем предыдущее значение переменных перед открытием
  addCardName.value = "";
  addCardImage.value = "";
}

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

function formSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  
  closePopUp();

};

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

  addEventListeners(cardTrash, cardLike, cardImage, popUpImageCloseButton);
  
  cardList.prepend(cloneTemplate);  
  
  closePopUpAdd();
}
//Рендер Новых карт

popUpForm.addEventListener('submit', formSubmitHandler); 

popUpAddForm.addEventListener('submit', renderNewCard);
