//Валидация
class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formSelector = config.formSelector; //формы с классом '.form',
        this._inputSelector = config.inputSelector;//input в форме с классом '.popup__input'
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // Находим все поля внутри формы, сделаем из них массив методом Array.from (массив из всех input-ов)
        this._submitButtonSelector = config.submitButtonSelector;//кнопка отправки формы
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (input) => {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        // Заменим содержимое span на переданный параметр
        this._errorElement.textContent = input.validationMessage;
        // Показываем сообщение об ошибке
        this._errorElement.classList.add(this._errorClass);
    }

    // Функция, которая убирает класс с ошибкой
    _hideInputError = (input) => {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
       // console.log( this._errorElement)
        input.classList.remove(this._inputErrorClass);
        // Скрываем сообщение об ошибке
        this._errorElement.classList.remove(this._errorClass);
        // Очистим ошибку
        this._errorElement.textContent = '';
    }

    //Функция, которая делает кнопку неактивной
    _inactiveSubmitButton = () => {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    }

    //Функция, которая делает кнопку активной
    _activateSubmitButton = () => {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled', true);
    };

    // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = () => {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
            // сделать кнопку неактивной
            this._inactiveSubmitButton();
        } else {
            // иначе сделай кнопку активной
            this._activateSubmitButton();
        }
    };

    // Функция, которая проверяет валидность поля
    _isValid = (input) => {
        if (!input.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(input);
        } else {
            // Если проходит, скроем
            this._hideInputError(input);
        }
    };

    // Функция принимает массив полей
    _hasInvalidInput = () => {
        // проходим по этому массиву методом some
        return this._inputList.some((input) => {
            // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
            return !input.validity.valid;
        });
    };

    //функция, которая примет параметром элемент формы и добавит её полям нужные обработчики
    _setEventListeners = () => {
        // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
        this._toggleButtonState();
        // Обойдём все элементы полученной коллекции
        this._inputList.forEach((input) => {
            // каждому полю добавим обработчик события input
            input.addEventListener('input',  () => {
                this._isValid(input);
                // Вызываем toggleButtonState
                this._toggleButtonState();
            });
        });
    };

    // Функция, которая добавляет валидацию ко всем формам на странице
    enableValidation = () => {
        // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
        this._formList = Array.from(document.querySelectorAll(this._formSelector));
        // Переберём полученную коллекцию
        this._formList.forEach((form) => {
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы и объект с настройками
            this._setEventListeners();
        });
    };

    deleteError = () => {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
            if (input.validity.valid) {
                this._activateSubmitButton();
            } else {
                this._inactiveSubmitButton();
            }
        });
    };
}

export { FormValidator };