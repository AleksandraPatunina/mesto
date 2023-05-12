//НОВОЕ ПР6

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    // Находим элемент span с сообщением об ошибке внутри самой формы
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    // Заменим содержимое span на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    // Находим элемент span с сообщением об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement, settings);
    }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
};

//Функция, которая делает кнопку неактивной
const inactiveSubmitButton = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

//Функция, которая делает кнопку активной
const activateSubmitButton = (buttonElement, settings) => {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделать кнопку неактивной
        inactiveSubmitButton(buttonElement, settings);
    } else {
        // иначе сделай кнопку активной
        activateSubmitButton(buttonElement, settings);
    }
};

//функция, которая примет параметром элемент формы и добавит её полям нужные обработчики
const setEventListeners = (formElement, settings) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement, settings);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, settings);
            // Вызываем toggleButtonState и передаем ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// Функция, которая добавляет валидацию ко всем формам на странице
const enableValidation = (settings) => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы и объект с настройками
        setEventListeners(formElement, settings);
    });
};

// Создаем объект с настройками
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_type_active'
};

// Вызываем функцию enableValidation и передаем ей объект с настройками
enableValidation(validationConfig);

export { inactiveSubmitButton };
