//объявление переменных
const openPopupBtn = document.querySelector(".profile__edit-button");//кнопка редактирвоания профиля
const formEditProfile = document.querySelector(".form-profile");
const formAddCard = document.querySelector('.form-add');
const formEditAvatar = document.querySelector('.form-edit-profile');
const editAvatarBtn = document.querySelector(".profile__avatar-edit");//кнопка редактирвоания аватара
const addPopupBtn = document.querySelector(".profile__add-button");//кнопка откртия формы для добавления новой карточки

// Создаем объект с настройками
const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_type_active'
};

//создаем объект для профиля
const profileConfig = {
  profileName: '.profile__info-title',
  profileJob: '.profile__info-subtitle',
  profileAvatar: '.profile__avatar'
}


  export {openPopupBtn,
    formEditProfile,
    formAddCard,
    formEditAvatar,
    addPopupBtn,
    editAvatarBtn,
    config,
    profileConfig};