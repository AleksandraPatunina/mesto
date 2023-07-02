import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitBtn = this._form.querySelector('.popup__submit-button');
    this._defaultBtnText = this._submitBtn.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitBtn.textContent = `${this._submitBtn.textContent}.`;
      this._submitFunction({ card: this._card, cardId: this._cardId });
      //this.close();
     });
  }
  //появление на кнопке текста Сохранить...
setupDefaultTextOnBtn(){
  this._submitBtn.textContent = this._defaultBtnText
}

  open = ({ card, cardId }) => {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}