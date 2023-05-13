import { initialCards } from "./constants.js";
import { inactiveSubmitButton } from "./validate.js";

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
const addFormElement = addPopup.querySelector(".form");
const pictureTemplate = document.getElementById("picture-template");
const picturesContainer = document.querySelector(".elements__items");
const titleInput = addFormElement.querySelector(".popup__input_type_title");
const linkInput = addFormElement.querySelector(".popup__input_type_link");
//кнопки
const openPopupBtn = document.querySelector(".profile__edit-button");
const addPopupBtn = document.querySelector(".profile__add-button");
const closePopupBtnProfile = document.querySelector(".popup__button-close_profile-container");
const closePopupBtnAddCard = document.querySelector(".popup__button-close_add-container");
const closePopupBtnPicture = document.querySelector(".popup__button-close_pictures-container");
const profilePopupSubmitBtn = profilePopup.querySelector('.popup__submit-button_save');
const addPopupSubmitBtn = addPopup.querySelector('.popup__submit-button_add');

//логика создания карточки
const createCardElement = (pictureData) => {
  const pictureElement = pictureTemplate.content.querySelector(".element").cloneNode(true);
  //находим элементы, которые будут меняться: картинка и ее подпись
  const cardPicture = pictureElement.querySelector(".element__photo");
  const cardPictureName = pictureElement.querySelector(".element__photo-name");
  //находим кнопки лайк и удалить
  const pictureDeleteBtn = pictureElement.querySelector(".element__delete");
  const likeBtn = pictureElement.querySelector(".element__like-button");

  cardPictureName.textContent = pictureData.name;
  cardPicture.src = pictureData.link;
  cardPicture.alt = pictureData.name;

  const handleDelete = () => {
    pictureElement.remove();
  };

  const handleLike = () => {
    likeBtn.classList.toggle("element__like-button_type_active");
  };

  //ставим слушатели
  pictureDeleteBtn.addEventListener("click", handleDelete);
  likeBtn.addEventListener("click", handleLike);

  //открытие увеличенной картинки
  cardPicture.addEventListener("click", () => {
    popupPicture.src = pictureData.link;
    popupPicture.alt = pictureData.name;
    popupPictureDescription.textContent = pictureData.name;
    openPopupHandler(picturePopup);
  });

  return pictureElement;
};

// создание карточек при загрузке страницы
initialCards.forEach((picture) => {
  const element = createCardElement(picture);
  picturesContainer.prepend(element);
});

//открытие всех popup-ов
function openPopupHandler(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByKeydownEsc);
};

//сохранение данных из формы
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
});

//создание карточки
addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  const newCardElement = createCardElement(newCardData);

  picturesContainer.prepend(newCardElement);
  evt.target.reset()
  closePopup(addPopup);
});

//закрытие popup при клике на оверлей
const closePopupByClickOnOverlay = (evt) => {
  const isOverlay = evt.target.classList.contains('popup'); 
  const isCloseBtn = evt.target.classList.contains('popup__button-close');
    
  if (isOverlay || isCloseBtn) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}; 

// закрытие  popup при нажатии на клавишу Escape
const closePopupByKeydownEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

//закрытие всех popup-ов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeydownEsc);
  document.removeEventListener('click', closePopupByClickOnOverlay);
};

//открытие popup для редактирования профиля
openPopupBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  inactiveSubmitButton(profilePopupSubmitBtn, { inactiveButtonClass: 'popup__submit-button_type_inactive' });
  openPopupHandler(profilePopup);
});

//открытие popup для создание пользователем новой карточки
addPopupBtn.addEventListener("click", () => {
  inactiveSubmitButton(addPopupSubmitBtn, { inactiveButtonClass: 'popup__submit-button_type_inactive' });
  openPopupHandler(addPopup);
});

//закрытие popup редактирования профиля
closePopupBtnProfile.addEventListener("click", () => {
  closePopup(profilePopup);
});

//закрытие popup добавления картинки
closePopupBtnAddCard.addEventListener("click", () => {
  closePopup(addPopup);
});

//закрытие popup просмотра увеличенной картинки
closePopupBtnPicture.addEventListener("click", () => {
  closePopup(picturePopup);
});