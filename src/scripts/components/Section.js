class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    //функция, отвечающая за создание и отрисовку данных на странице
    this.renderer = renderer;
  }

  //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  //добавляем карточку из массива
  cardsToAddFromOriginalArray() {
    this._initialCards.forEach(element => {   
      this.addItem(this.renderer(element));
    })
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
export { Section }