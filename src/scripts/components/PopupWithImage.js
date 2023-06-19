import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popup.querySelector(".popup__picture");
    this._description = this._popup.querySelector(".popup__picture-description");
  }

// Класс, который перезаписывает родительский метод open. В методе open класса PopupWithImage вставляется в попап картинка с src изображения и подпись к картинке
  open = (pictureData) => {
    this._picture.src = pictureData.link;
    this._picture.alt = pictureData.title;
    this._description.textContent = pictureData.title;
    super.open();
  }
}

export { PopupWithImage }