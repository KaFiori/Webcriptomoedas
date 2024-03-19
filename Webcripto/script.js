const cryptoDataURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

async function fetchCryptos() {
    try {
        const response = await fetch(cryptoDataURL);
        const cryptos = await response.json();

        const cryptoSelect = document.getElementById('crypto-select');
        const cryptoContainer = document.getElementById('crypto-container');

        cryptos.forEach(crypto => {
            const option = document.createElement('option');
            option.text = crypto.name;
            option.value = crypto.id;
            cryptoSelect.add(option);

            const cryptoCard = document.createElement('div');
            cryptoCard.classList.add('crypto-card');
            cryptoCard.innerHTML = `
                <img src="${crypto.image}" alt="${crypto.name}" class="crypto-image">
                <h2>${crypto.name}</h2>
                <p>${crypto.symbol.toUpperCase()}</p>
                <p>Price: $${crypto.current_price.toFixed(2)}</p>
                <p>Market Cap Rank: ${crypto.market_cap_rank}</p>
            `;
            cryptoContainer.appendChild(cryptoCard);
        });
    } catch (error) {
        console.error('Erro ao buscar dados das criptomoedas:', error);
    }
}

fetchCryptos();
