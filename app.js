const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMsg');
const emptyState = document.getElementById('emptyState');

// Interacción del usuario (búsqueda)
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchTVShows(query);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Consumo de API (TVMaze)
async function fetchTVShows(query) {
    // Limpiamos la vista
    hideAllStates();
    loading.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const data = await response.json();
        
        // Si el arreglo viene vacío, mostramos el mensaje de "No se encontró"
        if (data.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        renderShows(data);

    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

// Renderizado de componentes en el DOM
function renderShows(showsList) {
    resultsContainer.innerHTML = '';

    showsList.forEach(item => {
        // La API devuelve un objeto { score, show: {...} }
        const show = item.show;
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Extracción segura (por si alguna serie vieja no tiene portada o género)
        const title = show.name || 'Serie Desconocida';
        const image = show.image?.medium || 'https://via.placeholder.com/210x295?text=Sin+Imagen';
        const language = show.language || 'N/A';
        const rating = show.rating?.average ? `⭐ ${show.rating.average}` : 'Sin calificación';
        const genre = (show.genres && show.genres.length > 0) ? show.genres[0] : 'General';

        card.innerHTML = `
            <img src="${image}" alt="Portada de ${title}">
            <h3>${title}</h3>
            <p><strong>Idioma:</strong> ${language}</p>
            <p><strong>Calificación:</strong> ${rating}</p>
            <span class="badge">${genre}</span>
        `;
        
        resultsContainer.appendChild(card);
    });
}

function hideAllStates() {
    loading.classList.add('hidden');
    errorMsg.classList.add('hidden');
    emptyState.classList.add('hidden');
}