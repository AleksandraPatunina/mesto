class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    //функция, отвечающая за создание и отрисовку данных на странице
    this._renderer = renderer;
  }

  //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  //добавляем карточку из массива
  renderItems() {
    this._initialCards.forEach(element => {   
      this.addItem(element);
    })
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(data) {
    this._container.prepend(this._renderer(data));
  }
}
export { Section }