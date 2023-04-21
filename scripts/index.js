//объявление переменных
const openPopupBtn = document.querySelector(".profile__edit-button");
const addPopupBtn = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const addPopup = document.querySelector(".add-popup");
const addFormElement = addPopup.querySelector(".form");
const closePopupBtn = document.querySelectorAll(".popup__button-close");
const pictureTemplate = document.getElementById("picture-template");
const picturesContainer = document.querySelector(".elements__items");
let profileName = document.querySelector(".profile__info-title");
let profileJob = document.querySelector(".profile__info-subtitle");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let formElement = document.querySelector("form");

//массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

  return pictureElement;
};

initialCards.forEach((picture) => {
  const element = createCardElement(picture);
  picturesContainer.prepend(element);
});


//открытие popup
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add("popup_opened");
}


//сохранение данных из формы
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
});



//открытие popup для создания карточки
function openAddPopup() {
  addPopup.classList.add("popup_opened");
}


//создание карточки
addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const titleInput = addFormElement.querySelector(".popup__input_type_title");
  const linkInput = addFormElement.querySelector(".popup__input_type_link");
  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

  const newCardElement = createCardElement(newCardData);

  picturesContainer.prepend(newCardElement);

  addPopup.classList.remove("popup_opened");
});


//открытие увеличенной картинки
const elementPhotos = document.querySelectorAll(".element__photo");
elementPhotos.forEach((elementPhoto) => {
  elementPhoto.addEventListener("click", () => {
    const picturePopup = document.querySelector(".popup-pictures");
    const popupPicture = picturePopup.querySelector(".popup__picture");
    const popupPictureDescription = picturePopup.querySelector(".popup__picture-description");

    popupPicture.src = elementPhoto.src;
    popupPicture.alt = elementPhoto.alt;
    popupPictureDescription.value = elementPhoto.textContent;

    picturePopup.classList.add("popup_opened");
  });
});


//закрытие всех popup
closePopupBtn.forEach((button) => {
  button.addEventListener("click", () => {
    // находим родительский элемент кнопки - popup
    const popup = button.closest(".popup");
    popup.classList.remove("popup_opened");
  });
});


openPopupBtn.addEventListener("click", openPopup);
addPopupBtn.addEventListener("click", openAddPopup);
