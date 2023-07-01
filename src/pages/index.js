import './index.css';
import {
  initialCards,
  openPopupBtn,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  addPopupBtn,
  editAvatarBtn,
  config,
  profileConfig
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Section } from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupDeleteCard from '../scripts/components/PopupDeleteCard.js';
import Api from '../scripts/components/Api.js'
const selectorTemplate = '#picture-template';

// попап с увеличенной картинкой
const picturePopup = new PopupWithImage('.popup-pictures');

//информация в блоке profile
const userInfo = new UserInfo(profileConfig);


const deletePopupCard = new PopupDeleteCard('.popup-delete', (element) => {
  element.removeCard();
  deletePopupCard.close();
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '36a4b4e3-163c-41d3-80ee-7b86f4545b14',
    'Content-Type': 'application/json'
  }
}); 


function createNewCard (element){
  const card = new Card(element, picturePopup.open, deletePopupCard.open);  //добавить в середину selectorTemplate,
  return card.createCard();
}
//задаем логику отображения карточек на странице и связывам м/у собой 2 компонента "Section" и "Card"
const section = new Section((element) =>{ 
  section.addItemAppend(createNewCard(element))
},'.elements__items');//<ul>

//отрисовываем карточки при загрузке страницы (из массива initialCards)
//section.renderItems(initialCards);

const popupDeletePicture = document.querySelector('.popup-delete-pictures');
//console.log(popupDeletePicture);
//const popupEditAvatar = document.querySelector('.edit-avatar-popup');
//console.log(popupEditAvatar);


//обновляем поля формы редактирования профиля на странице
const profilePopup = new PopupWithForm('.profile-popup', (inputValue) => {
  // полученные введенные пользователем данные у объекта popupProfile передаем в метод setUserInfo() обновляющий соответствующие поля профиля на странице
  //console.log('информация о пользователе будет сохранена в:', inputValue);
  api.setUserInfo(inputValue)
  .then(res => {
    userInfo.setUserInfo({username:res.name, job:res.about, avatar:res.avatar})
  })
  .catch((error => console.error(`Возникла ошибка при попытке редактирования профиля ${error}`)))
  .finally()
});

// Popup для добавления новой картинки
const popupAddCard = new PopupWithForm('.add-popup', (inputValue) => {
  section.addItem(createNewCard(inputValue));
});

//Popup для изменения аватара профиля
const popupEditAvatar = new PopupWithForm('.edit-avatar-popup',(InputValue)=> {
  api.setNewAvatarPicture(InputValue)
  .then(res => {
    console.log(res)
    userInfo.setUserInfo({username:res.name, job:res.about, avatar:res.avatar})
  })
  .catch((error => console.error(`Возникла ошибка при обновлении аватара профиля ${error}`)))
  .finally()
//document.querySelector('.profile__avatar').src = InputValue.avatar //src картинки аватара
}) 
//console.log(popupEditAvatar)

//экземпляр для валидации
const formEditProfileValidation = new FormValidator(config, formEditProfile);
formEditProfileValidation.enableValidation();

const formAddCardValidation = new FormValidator(config, formAddCard);
formAddCardValidation.enableValidation();

 const formEditAvatarValidation = new FormValidator(config, formEditAvatar);
 formEditAvatarValidation.enableValidation();



//добавляем слушатель каждому попапу
profilePopup.setEventListeners();
popupAddCard.setEventListeners();
picturePopup.setEventListeners();
popupEditAvatar.setEventListeners();
deletePopupCard.setEventListeners();

//открытие popup для редактирования профиля
openPopupBtn.addEventListener('click', () => {
  formEditProfileValidation.deleteError();
  //console.log('setInputValue вызван');
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
});

//открытие popup для создание пользователем новой карточки
addPopupBtn.addEventListener('click', () => {
  formAddCardValidation.deleteError();
  popupAddCard.open();
});

//открытие popup для смены аватара
  editAvatarBtn.addEventListener('click', () => {
formEditAvatarValidation.deleteError();
 popupEditAvatar.open();
 });

Promise.all([api.getInfo(), api.getCards()])
.then(([userData,cardData]) => {
  cardData.forEach(element => element.myId = userData._id)
  userInfo.setUserInfo({username:userData.name, job:userData.about, avatar:userData.avatar})
  section.renderItems(cardData);
})
.catch((error => console.error(`Возникла ошибка при начальной загрузке страницы ${error}`)))