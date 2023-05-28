import { initialCards } from "./constants.js";
import { Card }  from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//объявление переменных
//popup-ы
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector(".profile-popup");
const addPopup = document.querySelector(".add-popup");
const picturePopup = document.querySelector(".popup-pictures");
const popupPicture = picturePopup.querySelector(".popup__picture");
const popupPictureDescription = picturePopup.querySelector(".popup__picture-description");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const formEditProfile = document.querySelector(".form-profile");
const formAddCard = document.querySelector('.form-add');
const addFormElement = addPopup.querySelector(".form");
const pictureTemplate = document.querySelector('#picture-template');
const picturesContainer = document.querySelector('.elements__items');
const titleInput = addFormElement.querySelector(".popup__input_type_title");
const linkInput = addFormElement.querySelector(".popup__input_type_link");
//кнопки
const openPopupBtn = document.querySelector(".profile__edit-button");
const addPopupBtn = document.querySelector(".profile__add-button");
const profilePopupSubmitBtn = profilePopup.querySelector('.popup__submit-button_save');
const addPopupSubmitBtn = addPopup.querySelector('.popup__submit-button_add');

//открытие увеличенной картинки
function openImagePopup(pictureData) {
  popupPicture.src = pictureData.link;
  popupPicture.alt = pictureData.name;
  popupPictureDescription.textContent = pictureData.name;
  openPopupHandler(picturePopup);
};

//функция для создания новой карточки на странице (разметка: описание и картинка)
function createNewPictureCard(element) {
  const card = new Card(element, pictureTemplate, openImagePopup);
  const pictureElement = card.createCard();
  return pictureElement;
}

//функция, которая добавляет карточку на странице вперед,т.е. новая карточка будет отображаться вначале
function addNewCard(container, card) {
  container.prepend(card);
}

// отображение карточек при загрузке страницы
initialCards.forEach((element) => {
  addNewCard(picturesContainer, createNewPictureCard(element));
});

//открытие всех popup-ов
function openPopupHandler(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('click', closePopupByClickOnOverlayAndCloseBtn);
  document.addEventListener('keydown', closePopupByKeydownEsc);
};

//сохранение данных из формы профиля
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
});

//сохранение данных из формы создания карточки с картинкой
addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  addNewCard(picturesContainer, createNewPictureCard(newCardData));
  evt.target.reset();
  closePopup(addPopup);
});

// Создаем объект с настройками
const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_type_active'
};

//закрытие popup при клике на оверлей и крестик
const closePopupByClickOnOverlayAndCloseBtn = (evt) => {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__button-close');

  if (isOverlay || isCloseBtn) {
    const openedPopup = document.querySelector('.popup_opened');//находим открытый popup
    if (openedPopup) {
      closePopup(openedPopup);//закрываем только этот один открытый popup
    }
  }
};

// закрытие  popup при нажатии на клавишу Escape
const closePopupByKeydownEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');//находим открытый popup
    if (openedPopup) {
      closePopup(openedPopup);//закрываем только открытый popup
    }
  }
};

//закрытие всех popup-ов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeydownEsc);
  document.removeEventListener('click', closePopupByClickOnOverlayAndCloseBtn);
};

//открытие popup для редактирования профиля
openPopupBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formEditProfileValidation.deleteError();
  openPopupHandler(profilePopup);
});

//открытие popup для создание пользователем новой карточки
addPopupBtn.addEventListener("click", () => {
  formAddCardValidation.deleteError();
  openPopupHandler(addPopup);
 });
 
//экземпляр для валидации
const formEditProfileValidation = new FormValidator(config, formEditProfile);
formEditProfileValidation.enableValidation();

const formAddCardValidation = new FormValidator(config, formAddCard);
formAddCardValidation.enableValidation();

