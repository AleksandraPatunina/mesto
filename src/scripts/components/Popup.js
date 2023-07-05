export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handlePopupCloseByClick = this._handlePopupCloseByClick.bind(this);
    this._closePopupByKeydownEsc = this._closePopupByKeydownEsc.bind(this);
    }

    //закрытие popup при клике на оверлей и крестик
    _handlePopupCloseByClick = (evt) => {
        this._isOverlay = evt.target.classList.contains('popup');
        this._isCloseBtn = evt.target.classList.contains('popup__button-close');
        if (this._isOverlay || this._isCloseBtn) {
            this.close();
        }
    }

    // закрытие  popup при нажатии на клавишу Escape
    _closePopupByKeydownEsc = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //публичный метод который отвечает за открытие  попапа
    open() {
        this._popup.classList.add('popup_opened');
       // this.setEventListeners();
      document.addEventListener('keydown', this._closePopupByKeydownEsc);
    }

      //публичный метод который отвечает за закрытие  попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown',this._closePopupByKeydownEsc);
        // document.removeEventListener('keydown', this._closePopupByKeydownEsc);
        // document.removeEventListener('click', this._handlePopupCloseByClick);
    }

    // публичный метод, который добавляет слушатель клика иконке закрытия попапа + закрытие по оверлей 
    setEventListeners() {
        document.addEventListener('click', this._handlePopupCloseByClick);
        document.addEventListener('keydown', this._closePopupByKeydownEsc);
    }
}
