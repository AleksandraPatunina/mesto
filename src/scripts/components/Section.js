class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
   // this._initialCards = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    //функция, отвечающая за создание и отрисовку данных на странице
    this._renderer = renderer;
  }

  //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  //добавляем карточку из массива
  renderItems(dataCard) {
    dataCard.forEach(element => {   
      this._renderer(element);
    })
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItemPrepend(elementDom) {
    this._container.prepend(elementDom);
  }

   // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
   addItemAppend(elementDom) {
    this._container.append(elementDom);
  }
}
export { Section }