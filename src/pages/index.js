import './index.css';
import {
  initialCards,
    openPopupBtn,
    formEditProfile,
    formAddCard,
    addPopupBtn,
    config,
    profileConfig
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Section } from '../scripts/components/Section.js';
import UserInfo  from '../scripts/components/UserInfo.js';
import PopupWithForm  from '../scripts/components/PopupWithForm.js'


const selectorTemplate = '#picture-template';


// попап с увеличенной картинкой
const picturePopup = new PopupWithImage('.popup-pictures');

//информация в блоке profile
const userInfo = new UserInfo(profileConfig);

//задаем логику отображения карточек на странице и
// связывам м/у собой 2 компонента "Section" и "Card"
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element,  picturePopup.open);  //добавить в середину selectorTemplate,
    return card.createCard();
  }
}, '.elements__items');//<ul>

//отрисовываем карточки при загрузке страницы (из массива initialCards)
section.cardsToAddFromOriginalArray();

//обновляем поля формы редактирования профиля на странице
const profilePopup = new PopupWithForm('.profile-popup', (evt) => {
  evt.preventDefault();
//вызываем метод getInputValue()(получающий введенные пользователем данные) у объекта popupProfile
//полученные данные передаем в метод setUserInfo() объекта userInfo, обновляющий соответствующие поля профиля на странице
  userInfo.setUserInfo(profilePopup.getInputValue());
  //закрываем форму
  profilePopup.close();
});

// Popup для добавления новой картинки
const addPopup = new PopupWithForm('.add-popup', (evt) => {
  evt.preventDefault();
//вызывает метод addItem у объекта section, который добавляет новую карточку на страницу
  section.addItem(section.renderer(addPopup.getInputValue()));
  addPopup.close();
});

//экземпляр для валидации
const formEditProfileValidation = new FormValidator(config, formEditProfile);
formEditProfileValidation.enableValidation();

const formAddCardValidation = new FormValidator(config, formAddCard);
formAddCardValidation.enableValidation();

//добавляем слушатель каждому попапу
profilePopup.setEventListeners();
addPopup.setEventListeners();
picturePopup.setEventListeners();

//открытие popup для редактирования профиля
openPopupBtn.addEventListener('click', () => {
  formEditProfileValidation.deleteError();
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
});

//открытие popup для создание пользователем новой карточки
addPopupBtn.addEventListener('click', () => {
  formAddCardValidation.deleteError();
  addPopup.open();
});
