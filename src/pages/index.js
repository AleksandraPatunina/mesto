import './index.css';
import {
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '36a4b4e3-163c-41d3-80ee-7b86f4545b14',
    'Content-Type': 'application/json'
  }
}); 

// попап с увеличенной картинкой
const picturePopup = new PopupWithImage('.popup-pictures');

//информация в блоке profile
const userInfo = new UserInfo(profileConfig);

//popup удления карточки с картинкой
const deletePopupCard = new PopupDeleteCard('.popup-delete', ({card, cardId}) => {
  api.deleteCard(cardId)
.then(() => {
  card.removeCard();
  deletePopupCard.close()
})
.catch((error => console.error(`Возникла ошибка при попытке удаления карточки ${error}`)))
.finally(() => deletePopupCard.setupDefaultTextOnBtn())
});


//функция создания новой карточки
function createNewCard (element){
  const card = new Card(element, picturePopup.open, deletePopupCard.open, (likeElement, cardId) => {
    if (card.isLiked()) {
  api.deleteLike(cardId)
  .then(res => {
    card.toggleLike(res.likes);
  })
  .catch((error => console.error(`Возникла ошибка при попытке убрать лайк ${error}`)))
} else {
  api.addLike(cardId)
  .then(res => {
    card.toggleLike(res.likes);    
  })
  .catch((error => console.error(`Возникла ошибка при попытке поставить лайк ${error}`)))
}
  });  //добавить в середину selectorTemplateи проверить лайк
  return card.createCard();
}
//задаем логику отображения карточек на странице и связывам м/у собой 2 компонента "Section" и "Card"
const section = new Section((element) =>{ 
  section.addItemAppend(createNewCard(element))
},'.elements__items');//<ul>

//обновляем поля формы редактирования профиля на странице
const profilePopup = new PopupWithForm('.profile-popup', (inputValue) => {
  // полученные введенные пользователем данные у объекта popupProfile передаем в метод setUserInfo() обновляющий соответствующие поля профиля на странице
  api.setUserInfo(inputValue)
  .then(res => {
    userInfo.setUserInfo({username:res.name, job:res.about, avatar:res.avatar})
    profilePopup.close()    
  })
  .catch((error => console.error(`Возникла ошибка при попытке редактирования профиля ${error}`)))
  .finally(()=> profilePopup.setupDefaultTextOnBtn())
});

// Popup для добавления новой картинки
const popupAddCard = new PopupWithForm('.add-popup', (inputValue) => {
  api.addCard(inputValue)
  .then((res) => {
    res.myId = res.owner._id;
    section.addItemPrepend(createNewCard(res));
    popupAddCard.close()    
  })
  .catch((error => console.error(`Возникла ошибка при попытке добавления картинки ${error}`)))
  .finally(()=> popupAddCard.setupDefaultTextOnBtn())
});

//Popup для изменения аватара профиля
const popupEditAvatar = new PopupWithForm('.edit-avatar-popup',(InputValue)=> {
  api.setNewAvatarPicture(InputValue)
  .then(res => {
   // console.log(res)
    userInfo.setUserInfo({username:res.name, job:res.about, avatar:res.avatar})
    popupEditAvatar.close()
  })
  .catch((error => console.error(`Возникла ошибка при обновлении аватара профиля ${error}`)))
  .finally(()=>popupEditAvatar.setupDefaultTextOnBtn())
}) 

//экземпляр для валидации
const formEditProfileValidation = new FormValidator(config, formEditProfile);
formEditProfileValidation.enableValidation();

const formAddCardValidation = new FormValidator(config, formAddCard);
formAddCardValidation.enableValidation();

 const formEditAvatarValidation = new FormValidator(config, formEditAvatar);
 formEditAvatarValidation.enableValidation();

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

//  //принимаем массив с промисами и выполняем код только тогда, когда все промисы исполнены
Promise.all([api.getInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    const modifiedCardData = cardData.map((card) => {
      return {
        ...card,
        myId: userData._id,
      };
    });
    userInfo.setUserInfo({
      username: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    section.renderItems(modifiedCardData);
  })
  .catch((error) =>
    console.error(`Возникла ошибка при начальной загрузке страницы ${error}`)
  );