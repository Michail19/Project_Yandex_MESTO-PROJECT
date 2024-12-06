const page = document.querySelector('.page');


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Функция для показа ошибки
const showInputError = (form, input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add('popup__input_type_error');
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('popup__input-error_active');
};

// Функция для скрытия ошибки
const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
};

// Проверка конкретного поля
const checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
        showInputError(form, input);
    } else {
        hideInputError(form, input);
    }
};

// Проверка всех полей формы
const validateForm = (form) => {
    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.validity.valid) {
            isValid = false;
            showInputError(form, input);
        } else {
            hideInputError(form, input);
        }
    });

    return isValid;
};

// Включение слушателей на все поля формы
const setEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll('.popup__input'));

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input);
        });
    });
};

// Инициализация валидации для форм
const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll('.popup__form'));
    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (validateForm(form)) {
                // Дополнительные действия, если форма валидна
                console.log('Форма успешно отправлена');
            }
        });
        setEventListeners(form);
    });
};

// Запуск валидации
enableValidation();


// Popap edit
const editPopup = page.querySelector('.popup_type_edit');
const editButton = page.querySelector('.profile__edit-button');
const editForm = document.forms['edit-profile'];
const editFormError = editForm.querySelector(`.text-input-error`);
const profileName = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const closeEditButton = editPopup.querySelector('.popup__close');
const editFormSubmitButton = editForm.querySelector('.popup__button');

// Обработчики открытия и закрытия карточки edit
editButton.addEventListener('click', () => {
    editForm.elements['name'].value = profileName.textContent;
    editForm.elements['description'].value = profileDescription.textContent;
    openModal(editPopup);
});

closeEditButton.addEventListener('click', () => {
    closeModal(editPopup);
});

// Пример использования в обработчиках submit
editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm(editForm)) {
        const nameInput = editForm.elements['name'].value;
        const descriptionInput = editForm.elements['description'].value;

        profileName.textContent = nameInput;
        profileDescription.textContent = descriptionInput;

        closeModal(editPopup);
        saveProfileToLocalStorage(nameInput, descriptionInput);
    }
});

const toggleButtonState = (form, button) => {
    if (form.checkValidity()) {
        button.classList.remove('popup__button_disabled');
        button.disabled = false;
    } else {
        button.classList.add('popup__button_disabled');
        button.disabled = true;
    }
};

// Для editForm
editForm.addEventListener('input', () => {
    toggleButtonState(editForm, editFormSubmitButton);
});

editButton.addEventListener('click', () => {
    toggleButtonState(editForm, editFormSubmitButton);
});

// Локальная загрузка данных
document.addEventListener('DOMContentLoaded', () => {
    loadProfileFromLocalStorage();
});

function saveProfileToLocalStorage(name, description) {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileDescription', description);
}

function loadProfileFromLocalStorage() {
    const savedName = localStorage.getItem('profileName');
    const savedDescription = localStorage.getItem('profileDescription');

    if (savedName && savedDescription) {
        profileName.textContent = savedName;
        profileDescription.textContent = savedDescription;
    }
}


// Popap new-card
const newCardPopup = page.querySelector('.popup_type_new-card');
const newCardButton = page.querySelector('.profile__add-button');
const closeNewCardButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');

// Обработчики открытия и закрытия карточки new-card
newCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});


// Popap card
const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');
const newCardFormSubmitButton = newCardForm.querySelector('.popup__button');

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openModal(imagePopup);
}

// Закрытие попапа с изображением
closeImageButton.addEventListener('click', () => closeModal(imagePopup));

imagePopup.addEventListener('click', (event) => {
    if (event.target === imagePopup) { // Если клик был вне содержимого попапа
        closeModal(imagePopup);
    }
});

// Шаблон карточки и список
const placesList = page.querySelector('.places__list');
const cardTemplate = page.querySelector('#card-template').content;

// Функция для создания новой карточки
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Заполняем данные карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Обработчики на элементы карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        cardElement.remove(); // Удаление карточки
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('card__like-button_is-active'); // Лайк
    });

    cardImage.addEventListener('click', () => openImagePopup(link, name)); // Открытие попапа с изображением

    return cardElement;
}

// Функция добавления карточки в список
function addCard(name, link) {
    const newCard = createCard(name, link);
    placesList.prepend(newCard);
}

newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm(newCardForm)) {
        const placeName = newCardForm.elements['place-name'].value;
        const placeLink = newCardForm.elements['link'].value;

        addCard(placeName, placeLink);
        closeModal(newCardPopup);
        newCardForm.reset();
    }
});

// Для newCardForm
newCardForm.addEventListener('input', () => {
    toggleButtonState(newCardForm, newCardFormSubmitButton);
});

newCardButton.addEventListener('click', () => {
    newCardForm.reset(); // Очистите поля, если нужно
    toggleButtonState(newCardForm, newCardFormSubmitButton);
});


// Функция для рендера начальных карточек
function renderInitialCards(cards) {
    cards.forEach((card) => {
        addCard(card.name, card.link);
    });
}

// Вызываем функцию при загрузке страницы
renderInitialCards(initialCards);

// Добавление слушателя на клавишу Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { // Проверка, что нажата клавиша Escape
        if (editPopup) {
            closeModal(editPopup);
        }
        if (newCardPopup) {
            closeModal(newCardPopup);
        }
        if (imagePopup) {
            closeModal(imagePopup);
        }
    }
});



// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
