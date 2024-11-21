const page = document.querySelector('.page');


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// Popap edit
const editPopup = page.querySelector('.popup_type_edit');
const editButton = page.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');

// Обработчики открытия и закрытия карточки edit
editButton.addEventListener('click', () => {
    openModal(editPopup);
});

closeEditButton.addEventListener('click', () => {
    closeModal(editPopup);
});


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

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openModal(imagePopup);
}

// Закрытие попапа с изображением
closeImageButton.addEventListener('click', () => closeModal(imagePopup));

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
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения из формы
    const placeName = newCardForm.elements['place-name'].value;
    const placeLink = newCardForm.elements['link'].value;

    // Добавляем новую карточку
    addCard(placeName, placeLink);

    // Закрываем попап и очищаем форму
    closeModal(newCardPopup);
    newCardForm.reset();
});




// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
