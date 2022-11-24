const editButton = document.querySelector('.profile__edit-button'),
      popUp = document.querySelector('.pop-up'),
      closeButton = popUp.querySelector('.pop-up__close-button'),
      saveButton = popUp.querySelector('.pop-up__submit'),
      profileEditName = popUp.querySelector('.pop-up__input_type_name'), // input "Имя" в pop-up
      profileEditDescription = popUp.querySelector('.pop-up__input_type_description'), // input "О себе" в pop-up
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');

function changeVisability() {
  popUp.classList.toggle('visible'); // вешаем/снимаем класс на попап
}

editButton.addEventListener('click', changeVisability);
closeButton.addEventListener('click', changeVisability);

function formSubmitHandler (evt) {
  let nameFromPage =  profileName.textContent,
      descriptionFromPage = profileDescription.textContent,
      nameFromForm = profileEditName.value,
      descriptionFromForm = profileEditDescription.value;

  evt.preventDefault(); 

  if(nameFromForm === nameFromPage && descriptionFromForm === descriptionFromPage) {  
    /* Если не внесено никаких изменений, то просто закрываем попап, 
    иначе меняем содержимое на странице.*/
    changeVisability();
  } else {
    profileName.textContent = nameFromForm;
    profileDescription.textContent = descriptionFromForm;
    changeVisability();
  } 
   
}

profileEditName.value = profileName.textContent;  
profileEditDescription.value = profileDescription.textContent;
//контент со страницы отобразится в форме до редактирования.

saveButton.addEventListener('click', formSubmitHandler); 

