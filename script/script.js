let editButton = document.querySelector('.profile__edit-button'),
    popUp = document.querySelector('.pop-up__wrapper'),
    closeButton = popUp.querySelector('.pop-up__close-button'),
    saveButton = popUp.querySelector('.pop-up__submit'),
    profileEditName = popUp.querySelector('.pop-up__input_type_name'),
    profileEditDescription = popUp.querySelector('.pop-up__input_type_description'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description');

function changeVisability() {
  popUp.classList.toggle('visible');
}

editButton.addEventListener('click', changeVisability);
closeButton.addEventListener('click', changeVisability);

function formSubmitHandler (evt) {
  let profileEditName = popUp.querySelector('.pop-up__input_type_name'),
      profileEditDescription = popUp.querySelector('.pop-up__input_type_description'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');

  evt.preventDefault(); 

  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;

  changeVisability();
}

  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;

saveButton.addEventListener('click', formSubmitHandler); 

