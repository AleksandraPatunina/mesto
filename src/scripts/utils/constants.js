//массив с карточками
const initialCards = [
    {
      title: "Архыз",
      link: "https://tourism.interfax.ru/images/cms-image-000012324.jpg",
    },
    {
      title: "Дагестан",
      link: "https://s2.stc.all.kpcdn.net/russia/wp-content/uploads/2022/10/Dagestan-photo1664540583-9.jpg",
    },
    {
      title: "Мурманск",
      link: "https://r1.nubex.ru/s12929-0f7/f1577_41/%D0%9A%20105%20-%20%D0%BB%D0%B5%D1%82%D0%B8%D1%8E%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%20%D0%9C%D1%83%D1%80%D0%BC%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%20(2).jpg",
    },
    {
      title: "Камчатка",
      link: "https://wanderings.online/wp-content/uploads/2016/10/kronotsky-nature-reserve-kamchatka.jpg",
    },
    {
      title: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      title: "Байкал",
      link: "https://library.vladimir.ru/wp-content/uploads/2017/03/%D0%B1%D0%B0%D0%B9.jpg",
    },
  ];

//объявление переменных
const openPopupBtn = document.querySelector(".profile__edit-button");//кнопка редактирвоания профиля
const formEditProfile = document.querySelector(".form-profile");
const formAddCard = document.querySelector('.form-add');
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
  profileJob: '.profile__info-subtitle'
}


  export { initialCards,
    openPopupBtn,
    formEditProfile,
    formAddCard,
    addPopupBtn,
    config,
    profileConfig};