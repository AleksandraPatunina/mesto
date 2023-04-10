//открытие и закрытие popup
const openPopupBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".popup__button-close");
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

//закрытие popup
function closePopup() {
  popup.classList.remove("popup_opened");
}

//сохранение данных из формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
