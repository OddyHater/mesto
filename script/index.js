const editButton = document.querySelector('.profile__edit-button'),
      popUp = document.querySelector('.popup'),
      popUpForm = popUp.querySelector('.popup__form'),
      closeButton = popUp.querySelector('.popup__close-button'),
      profileEditName = popUp.querySelector('.popup__input_type_name'),
      profileEditDescription = popUp.querySelector('.popup__input_type_description'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      pageTemplate = document.querySelector('.template'),
      cardList = document.querySelector('.cards__list'),
      addCardButton = document.querySelector('.profile__add-button'),
      popUpAdd = document.querySelector('.popup-add'),
      popUpAddForm = popUpAdd.querySelector('.popup-add__form'),
      closeButtonAdd = popUpAdd.querySelector('.popup-add__close-button'),
      addCardName = popUpAddForm.querySelector('.popup-add__input_type_name'),
      addCardImage = popUpAddForm.querySelector('.popup-add__input_type_description'),
      profileNameAdd = document.querySelector('.profile__name');
      
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

initialCards.forEach(function(item) {                           //Отрисовка карочек из массива
  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardList.appendChild(cloneTemplate);
});


function popUpOpen() {  
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;

  popUp.classList.toggle('popup_opened');
}
function popUpAddOpen() {
  clear();
  popUpAdd.classList.toggle('popup_opened');
}

function popUpClose() {
  popUp.classList.toggle('popup_opened');
}

function popUpAddClose() {
  popUpAdd.classList.toggle('popup_opened');
}



editButton.addEventListener('click', popUpOpen);
closeButton.addEventListener('click', popUpClose);

addCardButton.addEventListener('click', popUpAddOpen);
closeButtonAdd.addEventListener('click', popUpAddClose);

function clear() {
  addCardName.value = "";
  addCardImage.value = "";
}

function formSubmitHandler (evt) {  
  evt.preventDefault(); 

  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  
  popUpClose(popUp);
}

function addCardToPage (evt) {  
  evt.preventDefault(); 

  const cloneTemplate = pageTemplate.content.cloneNode(true);
  const cardTitle = cloneTemplate.querySelector('.card__name');
  const cardImage = cloneTemplate.querySelector('.card__image');
  
  cardImage.setAttribute('src', addCardImage.value);
  cardTitle.textContent = addCardName.value;
  cardImage.setAttribute('alt', addCardName.value);

  console.log(cloneTemplate); 

  cardList.prepend(cloneTemplate);
  
  
  popUpAddClose();   
}

popUpForm.addEventListener('submit', formSubmitHandler); 

popUpAddForm.addEventListener('submit', addCardToPage);

const likeCard = document.querySelectorAll('.card__like');

likeCard.forEach(function(item) {

  item.addEventListener('click', function() {
    item.classList.toggle('like_active');
  });
});

