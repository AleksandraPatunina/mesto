import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFunction) {
    super(popupSelector);
    this._formSubmitFunction = formSubmitFunction;
    this._form = this._popup.querySelector('.form');
    this._inputSelector = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__submit-button');
    this._defaultBtnText = this._submitBtn.textContent;
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
    this._submitBtn.textContent = 'Сохранение...';
    this._formSubmitFunction(this._getInputValue());
  };
  this._form.addEventListener('submit', this._submitHandler);
  console.log('Form submitted');
}

//появление на кнопке текста Сохранить...
setupDefaultTextOnBtn(){
  this._submitBtn.textContent = this._defaultBtnText
}

close() {
  super.close();
  this._form.reset();
}
 }