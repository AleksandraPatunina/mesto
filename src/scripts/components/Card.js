 class Card {
    constructor(pictureData, openImagePopup, openDeletePopup) {
        //console.log(pictureData);
        this._pictureData = pictureData;
        this._link = pictureData.link;
        this._name = pictureData.name;
        this._myId = pictureData.myId; //свойство, коорое хранит id
        this._ownerId = pictureData.owner._id; //чужой id в свойстве owner в массиве карточек с сервера
        this._openImagePopup = openImagePopup;
        this._openDeletePopup = openDeletePopup;
        this._cloneElement = document.getElementById('picture-template').content.querySelector('.element').cloneNode(true);
            //находим элементы, которые будут меняться: картинка и ее подпись
        this._imageElement = this._cloneElement.querySelector('.element__photo');
        this._cardSubtitle = this._cloneElement.querySelector('.element__photo-name');
          //находим кнопки лайк и удалить
        this._pictureDeleteBtn = this._cloneElement.querySelector('.element__delete');
        this._likeBtn = this._cloneElement.querySelector('.element__like-button');
    };

    //ставим лайк
    _handleLike = () => {
        this._likeBtn.classList.toggle('element__like-button_type_active');
    }

    //удаление элемента
    _handleDeletePicture = () => {
       // this._cloneElement.remove();
        this._openDeletePopup(this);
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

_changeTrashButtonVisibility(){
    if (this._myId === this._ownerId) {
        this._pictureDeleteBtn.style.display = 'block';
      } else {
        this._pictureDeleteBtn.style.display = 'none';
      }
}

removeCard() {
 this._cloneElement.remove();
}
 
//публичный метод создания карточки (логика)
createCard= () => {
   this._imageElement.src = this._link;
   this._imageElement.alt = this._name;
   this._cardSubtitle.textContent = this._name;
   this._changeTrashButtonVisibility();
   this._setEventListener();
     return this._cloneElement;
    };
}

export { Card }