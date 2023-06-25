import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFunction) {
    super(popupSelector);
    this._formSubmitFunction = formSubmitFunction;
    this._formSelector = this._popup.querySelector('.form');
    this._inputSelector = this._formSelector.querySelectorAll('.popup__input');
  }

  // приватный метод, который собирает данные всех полей формы для размещения в профиле
  _getInputValue() {
    this._value = {};
    this._inputSelector.forEach(input => {
      this._value[input.name] = input.value;
    });
    return this._value;
  }

  // для заполнения инпутов данными из профиля в момент открытия попапа 
  setInputValue(settings) {
    this._inputSelector.forEach(input => {
      input.value = settings[input.name]; //в нужный input здесь будет попадать нужная инф-ция со страницы
    })
  }
  
setEventListeners () {
  super.setEventListeners();
  this._submitHandler = (evt) => {
    evt.preventDefault();
    this._formSubmitFunction(this._getInputValue());
  };
  this._formSelector.addEventListener('submit', this._submitHandler);
}

close() {
  super.close();
  this._formSelector.reset();
  this._formSelector.removeEventListener('submit', this._submitHandler);
}
 }