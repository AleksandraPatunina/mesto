//открытие и закрытие popup
const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__button-close');


function openPopup() {
    popup.classList.add('popup_opened');
}
openPopupBtn.addEventListener('click', openPopup);


function closePopup(evt) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__button-close');

    if (isOverlay || isCloseBtn) {
        popup.classList.remove('popup_opened');
    }
}
popup.addEventListener('click', closePopup);


//Заполнение формы и submit
let profileName = document.querySelector('.profile__info-title');
let profileJob = document.querySelector('.profile__info-subtitle');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
let formElement = document.querySelector('.popup');


function handleFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#job');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}


formElement.addEventListener('submit', handleFormSubmit); 
