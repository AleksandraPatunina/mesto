 class Card {
    constructor(pictureData, pictureTemplate, openImagePopup) {
        this._pictureData = pictureData;
        this._link = pictureData.link;
        this._name = pictureData.name;
        this._pictureTemplate = pictureTemplate;
        this._openImagePopup = openImagePopup;
    };

    _getTemplateClone() {
        //выбираем контент Template, содержащийся в теге li, и клонируем его
        return this._pictureTemplate.content.querySelector('.element').cloneNode(true);
    };

    //ставим лайк
    _handleLike = () => {
        this._likeBtn.classList.toggle('element__like-button_type_active');
    }

    //удаление элемента
    _handleDeletePicture = () => {
        this._cloneElement.remove();
    }

    //открытие увеличенной картинки
    _handleOpenImagePopup = () => {
        this._openImagePopup(this._pictureData);
    }

    //слушатели событий
    _setEventListener() {
        this._likeBtn.addEventListener('click', this._handleLike);
        this._pictureDeleteBtn.addEventListener('click', this._handleDeletePicture);
        this._imageElement.addEventListener('click', this._handleOpenImagePopup);
    }

    //публичный метод создания карточки (логика)
    createCard() {
        this._cloneElement = this._getTemplateClone();
        //находим элементы, которые будут меняться: картинка и ее подпись
        this._imageElement = this._cloneElement.querySelector('.element__photo');
        this._cardSubtitle = this._cloneElement.querySelector('.element__photo-name');
        //находим кнопки лайк и удалить
        this._pictureDeleteBtn = this._cloneElement.querySelector('.element__delete');
        this._likeBtn = this._cloneElement.querySelector('.element__like-button');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardSubtitle.textContent = this._name;
        this._setEventListener();
        return this._cloneElement;
    };
}

export { Card }