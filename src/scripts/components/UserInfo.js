export default class UserInfo {
  constructor(profileConfig) {
    //Имя с селектором .profile__info-title
    this._profileName = document.querySelector(profileConfig.profileName);
    //О себе с селектром .profile__info-subtitle
    this._profileJob = document.querySelector(profileConfig.profileJob); 
  }

  //публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      title: this._profileName.textContent,
      subtitle: this._profileJob.textContent
    };
  };
 
  //публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newSettings) {
    this._profileName.textContent = newSettings.title;
    this._profileJob.textContent = newSettings.subtitle;
  };
}