export default class UserInfo {
  constructor(profileConfig) {
    //Имя с селектором .profile__info-title
    this._profileName = document.querySelector(profileConfig.profileName);
    //О себе с селектром .profile__info-subtitle
    this._profileJob = document.querySelector(profileConfig.profileJob); 
    //аватар с селектором .profile__avatar
    this._profileAvatar = document.querySelector(profileConfig.profileAvatar)
  }

  //публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      title: this._profileName.textContent,
      subtitle: this._profileJob.textContent
    };
  };
 
  //публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({username, job, avatar}) {
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
    this._profileAvatar.src = avatar; //имя name инпута
  };
}