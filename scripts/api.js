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

fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
  headers: {
    authorization: '7fcf3de6-59c1-4ab7-906f-9dafefeb6e1a'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
