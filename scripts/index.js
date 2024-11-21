const container = document.querySelector('.popup');


function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.add('popup_is-animated');
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);






// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
