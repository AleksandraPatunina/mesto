 class Card {
    constructor(pictureData, openImagePopup, openDeletePopup, changeLike) {
        //console.log(pictureData);
        this._pictureData = pictureData;
        this._link = pictureData.link;
        this._name = pictureData.name;
        this._myId = pictureData.myId; //свойство, коорое хранит id
        this._ownerId = pictureData.owner._id; //чужой id в свойстве owner в массиве карточек с сервера
        this._likes = pictureData.likes;
        this._likesLengthArray = pictureData.likes.length;
        this._cardId = pictureData._id;
        this._openImagePopup = openImagePopup;
        this._openDeletePopup = openDeletePopup;
        this._changeLike = changeLike;
        this._cloneElement = document.getElementById('picture-template').content.querySelector('.element').cloneNode(true);
            //находим элементы, которые будут меняться: картинка и ее подпись
        this._imageElement = this._cloneElement.querySelector('.element__photo');
        this._cardSubtitle = this._cloneElement.querySelector('.element__photo-name');
          //находим кнопки лайк и удалить
        this._pictureDeleteBtn = this._cloneElement.querySelector('.element__delete');
        this._likeBtn = this._cloneElement.querySelector('.element__like-button');
        this._likeCounter = this._cloneElement.querySelector('.element__like-counter')
    };

    //ставим лайк
    _handleLike = () => {
        this._changeLike(this._likeBtn, this._cardId)
    }

    //удаление элемента
    _handleDeletePicture = () => {
        this._openDeletePopup({ card: this, cardId: this._cardId });
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

removeCard = () => {
    this._cloneElement.remove();
  }

//проверяем,я ли посавила лайк
_checkLikes(){
    this._likes.forEach(element =>{
        if (element._id === this._myId){
            this._likeBtn.classList.add('element__like-button_type_active')
            return 
        }
    })
    this._likeCounter.textContent = this._likesLengthArray
} 

toggleLike(likes){
    this._likeBtn.classList.toggle('element__like-button_type_active');
    this._likeCounter.textContent = likes.length
}

//публичный метод создания карточки (логика)
createCard= () => {
   this._imageElement.src = this._link;
   this._imageElement.alt = this._name;
   this._cardSubtitle.textContent = this._name;
   this._checkLikes();
   this._changeTrashButtonVisibility();
   this._setEventListener();
     return this._cloneElement;
    };
}

export { Card }