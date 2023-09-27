const apiKey = 'aaa3eef4';

const nombresPeliculas = [
    { nombre: 'Transformers: Rise of the Beasts', anno: 2023 },
    { nombre: 'Blue Beetle', anno: 2023 },
    { nombre: 'Megalodon: The Frenzy', anno: 2023 },
    { nombre: 'Jung_E', anno: 2023 },
    // { nombre: 'The Super Mario Bros. Movie', anno: 2023 }
];

const nombresSeries = [
    { nombre: 'Breaking Bad' },
    { nombre: 'Game of Thrones' },
    { nombre: 'Stranger Things' },
    { nombre: 'Dark'},
    { nombre: 'The Simpsons'},
    { nombre: 'Halo'},
    { nombre: 'Sex Education'},
    { nombre: 'Loki'},
    { nombre: 'Hawkeye'},
    { nombre: 'Chernobyl'},    
];

async function buscarUltimoPoster(nombre, anno, esPelicula) {
    const url = `https://www.omdbapi.com/?t=${nombre}&y=${anno}&type=${esPelicula ? 'movie' : 'series'}&apikey=${apiKey}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.Poster) {
            const tarjeta = document.createElement('div');
            tarjeta.className = esPelicula ? 'movie-card' : 'series-card';

            const superposicion = document.createElement('div');
            superposicion.className = esPelicula ? 'movie-overlay' : 'series-overlay';

            const poster = document.createElement('img');
            poster.src = datos.Poster;

            const contenidoTarjeta = document.createElement('div');
            contenidoTarjeta.className = 'card-content';

            const titulo = document.createElement('h3');
            titulo.textContent = datos.Title;

            const descripcion = document.createElement('p');
            const botonVer = document.createElement('button');
            botonVer.textContent = 'Ver';

            descripcion.textContent = datos.Plot;

            contenidoTarjeta.appendChild(titulo);
            contenidoTarjeta.appendChild(descripcion);
            contenidoTarjeta.appendChild(botonVer);

            tarjeta.appendChild(superposicion);
            tarjeta.appendChild(poster);
            tarjeta.appendChild(contenidoTarjeta);

            return tarjeta;
        } else {
            console.error(`No se encontró un póster para: ${nombre}`);
        }
    } catch (error) {
        console.error(`Hubo un error al obtener los datos de la API para: ${nombre}`, error);
    }
}

async function mostrarUltimosPosters(listaItems, esPelicula, idLista) {
    const lista = document.getElementById(idLista);

    for (const datosItem of listaItems) {
        const tarjetaItem = await buscarUltimoPoster(datosItem.nombre, datosItem.anno, esPelicula);
        if (tarjetaItem) {
            lista.appendChild(tarjetaItem);
        }
    }
}

window.addEventListener('load', () => {
    mostrarUltimosPosters(nombresPeliculas, true, 'movie-list');
    mostrarUltimosPosters(nombresSeries, false, 'series-list');
});
