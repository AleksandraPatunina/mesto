//объявление переменных
const openPopupBtn = document.querySelector(".profile__edit-button");
const addPopupBtn = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const addPopup = document.querySelector(".add-popup");
const closePopupBtn = document.querySelectorAll(".popup__button-close");
const likeBtn = document.querySelector(".element__like-button");
let profileName = document.querySelector(".profile__info-title");
let profileJob = document.querySelector(".profile__info-subtitle");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let formElement = document.querySelector("form");

//открытие popup
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add("popup_opened");
}

//сохранение данных из формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

//открытие popup с карточками
function openAddPopup() {
  addPopup.classList.add("popup_opened");
}

//закрытие всех popup
closePopupBtn.forEach(button => {
  button.addEventListener('click', () => {
    // находим родительский элемент кнопки - popup
    const popup = button.closest('.popup');
    popup.classList.remove('popup_opened');
  });
});

//поставить лайк
function like() {
  likeBtn.classList.add("element__like-button_type_active");
}



openPopupBtn.addEventListener("click", openPopup);
formElement.addEventListener("submit", handleFormSubmit);
addPopupBtn.addEventListener("click", openAddPopup);
likeBtn.addEventListener("click", like);
