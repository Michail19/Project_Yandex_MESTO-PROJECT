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

newCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция для добавления новой карточки
function addCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Заполняем данные карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Обработчики на кнопки карточки
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
        closeModal(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });

    // Добавляем карточку в список
    placesList.prepend(cardElement);
}

// Обработчик отправки формы
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения из формы
    const placeName = newCardForm.elements['place-name'].value;
    const placeLink = newCardForm.elements['link'].value;

    // Добавляем карточку
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
