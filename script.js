//Chave da API
const API_KEY_WEATHER = '4ad832de5ada57bd59262ec8d171e2d3';

document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage('default'); //define o background padrão
    const cityInput = document.getElementById('cityInput');
    const botaoBusca = document.getElementById('botaoBusca');
    const previsaoTempo = document.getElementById('previsaoTempo');
    const card = document.querySelector('.card');

// Evento de clique no botão de busca    
    botaoBusca.addEventListener('click', () => {
        const cidade = cityInput.value;
        if (cidade) {
            buscarCidade(cidade);
        }
    });

//evento ativar o botão de busca ao pressionar "Enter"
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cidade = cityInput.value;
            if (cidade) {
                buscarCidade(cidade);
            }
        }
    });

//Função para buscar a Previsão do Tempo atráves da escolha de uma cidade
    async function buscarCidade (cidade) {
        try {
            const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&appid=${API_KEY_WEATHER}&units=metric`);
            
            if (!resposta.ok) {
                throw new Error('Erro ao buscar dados do clima');
            }

            const data = await resposta.json();

            if (data.cod !== 200) {
                throw new Error(data.message || 'Erro desconhecido');
            }

            dadosNaTela(data);
            setBackgroundImage(data.weather[0].main);
        } catch (error) {
            console.error('Erro ao buscar dados do clima:', error);
            previsaoTempo.innerHTML = `<p>${error.message}</p>`;
            card.classList.remove('expandido');
            previsaoTempo.classList.remove('visible');
        }
    }

//Função para apresentar a Previsão do Tempo na tela
    function dadosNaTela(data) {
        const { name, main, weather } = data;
        previsaoTempo.innerHTML = `
            <h3>${name}</h3>
            <p class="temperatura">${Math.round(main.temp)}°C</p>
            <div class="descricao">
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
                <p>${weather[0].description}</p>
            </div>
            <p class="umidade">Umidade do ar: ${main.humidity}%</p>
        `;
        
    // Expande o card com as informações da Previsão do Tempo
        card.classList.add('expandido');
        setTimeout(() => {
            previsaoTempo.classList.add('visible');
        }, 500); // Espera o card expandir para mostrar a Previsão
    }

//Função para trocar o background de acordo com a Previsão do Tempo
    function setBackgroundImage(condicaoTempo) {
        const body = document.body;
        let imageUrl;

        switch (condicaoTempo.toLowerCase()) {
            case 'clear':
                imageUrl = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';
                break;
            case 'clouds':
                imageUrl = 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1951&q=80';
                break;
            case 'rain':
                imageUrl = 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80';
                break;
            case 'thunderstorm':
                imageUrl = 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80';
                break;
            case 'snow':
                imageUrl = 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                break;
            default:
                imageUrl = 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80';
                break;
        }

        body.style.backgroundImage = `url('${imageUrl}')`;
    }
});

