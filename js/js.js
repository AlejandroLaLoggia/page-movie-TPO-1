const apiKey = 'aaa3eef4';

const movieNames = [
    { name: 'Transformers: Rise of the Beasts', year: 2023 },
    { name: 'Blue Beetle', year: 2023 },
    { name: 'Megalodon: The Frenzy', year: 2023 },
    { name: 'Jung_E', year: 2023 },
    // { name: 'The Super Mario Bros. Movie', year: 2023 }
];

async function searchMovies() {
    const movieList = document.getElementById('movie-list');
    const verButton = document.createElement('button');
    verButton.textContent = 'Ver';

    for (const movieData of movieNames) {
        const url = `https://www.omdbapi.com/?s=${movieData.name}&y=${movieData.year}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Search) {
                data.Search.forEach(async movie => {
                    const movieCard = document.createElement('div');
                    movieCard.className = 'movie-card';

                    const movieWrapper = document.createElement('div');
                    movieWrapper.className = 'movie-overlay';

                    const moviePoster = document.createElement('img');
                    moviePoster.src = movie.Poster;

                    const cardContent = document.createElement('div');
                    cardContent.className = 'card-content';

                    const movieTitle = document.createElement('h3');
                    movieTitle.textContent = movie.Title;

                    const movieDescription = document.createElement('p');
                    const movieVer = verButton.cloneNode(true);

                    const detailUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
                    const detailResponse = await fetch(detailUrl);
                    const detailData = await detailResponse.json();

                    movieDescription.textContent = detailData.Plot;

                    cardContent.appendChild(movieTitle);
                    cardContent.appendChild(movieDescription);
                    cardContent.appendChild(movieVer);

                    movieCard.appendChild(movieWrapper);
                    movieCard.appendChild(moviePoster);
                    movieCard.appendChild(cardContent);

                    movieList.appendChild(movieCard);
                });
            } else {
                console.error(`No se encontraron películas para: ${movieData.name} en el año ${movieData.year}`);
            }
        } catch (error) {
            console.error(`Hubo un error al obtener los datos de la API para: ${movieData.name} en el año ${movieData.year}`, error);
        }
    }
}

window.addEventListener('load', searchMovies);
