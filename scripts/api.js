const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = async () => {
    try {
        const response = await fetch(`${config.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const cards = await response.json();
        return cards; // Вернуть данные карточек
    } catch (err) {
        console.error('Ошибка при запросе данных:', err);
        throw err; // Бросаем ошибку, чтобы обработать ее в index.js
    }
};

export const postCard = async (card) => {
    try {
        const response = await fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const cards = await response.json();
        return cards; // Вернуть данные карточек
    } catch (err) {
        console.error('Ошибка при запросе данных:', err);
        throw err;
    }
};

export const editCardPost = async (profile) => {
    try {
        const response = await fetch(`${config.baseUrl}/cards`, {
            method: 'PATCH',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const cards = await response.json();
        return cards; // Вернуть данные карточек
    } catch (err) {
        console.error('Ошибка при запросе данных:', err);
        throw err;
    }
};


export const deleteCardPost = async (cardElement) => {
    try {
        const cardId = cardElement.getAttribute('data-id'); // Получаем cardId  
        console.log(cardId);

        // Если нужно, можно отправить запрос на сервер для удаления
        const response = await fetch(`${config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const cards = await response.json();
        return cards; // Вернуть данные карточек
    } catch (err) {
        console.error('Ошибка при запросе данных:', err);
        throw err;
    }
}

// Функция для добавления лайка (PUT-запрос)
export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось поставить лайк');
            }
            return response.json();
        })
        .then(data => {
            console.log('Лайк поставлен:', data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Функция для удаления лайка (DELETE-запрос)
export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось убрать лайк');
            }
            return response.json();
        })
        .then(data => {
            console.log('Лайк убран:', data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
        headers: {
            authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a'
        }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });
