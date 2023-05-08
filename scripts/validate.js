//НОВОЕ ПР6
const formPopupElement = document.querySelector('.form');
const formInput = formPopupElement.querySelector('.popup__input');
const formError = formPopupElement.querySelector('.form__input-error');


// Функция, которая добавляет класс с ошибкой
const showInputError = (formPopupElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add('form__input-error_type_active');
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (formPopupElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    // Скрываем сообщение об ошибке
    errorElement.classList.remove('form__input-error_type_active');
    // Очистим ошибку
    errorElement.textContent = '';
};


// Функция, которая проверяет валидность поля
const isValid = (formPopupElement, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formPopupElement, inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        hideInputError(formPopupElement, inputElement);
    }
};


//Новое для кнопок
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
};
// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделать кнопку неактивной
        buttonElement.classList.add('popup__submit-button_type_inactive');
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('popup__submit-button_type_inactive');
    }
};


//функция, которая примет параметром элемент формы и добавит её полям нужные обработчики
const setEventListeners = (formPopupElement) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formPopupElement.querySelectorAll('.popup__input'));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = formPopupElement.querySelector('.popup__submit-button');
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
            isValid(formPopupElement, inputElement);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);

        });
    });
};


//Объявим функцию enableValidation, которая найдёт и переберёт все формы на странице:
const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.form'));

    // Переберём полученную коллекцию
    formList.forEach((formPopupElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formPopupElement);
    });
};

// Вызовем функцию
enableValidation();


// Изначально отключаем все кнопки
const saveButtons = document.querySelectorAll(".popup__submit-button");
saveButtons.forEach(button => {
    button.disabled = true;
});
// Включаем/отключаем кнопки при изменении данных в форме
formPopupElement.addEventListener("input", () => {
    if (formPopupElement.checkValidity()) {
        saveButtons.forEach(button => {
            button.disabled = false;
        });
    }
    else {
        saveButtons.forEach(button => {
            button.disabled = true;
        });
    }
});
