

const CONTENEDOR = document.querySelector("#contenedor");
const ACCION = document.querySelector("#accion");
const PUNTO = document.querySelectorAll("#punto");
let movimiento = 0;
const posicion = [0, -18, -33.32, -50];


const PREV = document.querySelector("#prev");
const NEXT = document.querySelector("#next");
const CARRUSEL = document.querySelector(".grande-2");
const CLOSE = document.querySelector("#close");
const LGT = document.querySelector("#lightbox");
const IMGLIST = document.querySelectorAll(".img-2");
const IFRAME = document.querySelector(".lgt__iframe");
let contador = 0;

//direcciones de los trailers
const TRAILER = {
    0: "_XMw8rjM9YM",
    1: "jzQn0-WH4WM",
    2: "gdSGIf8kbhg",
    3: "gHnSewj5lGI",
    4: "SzrkMCeeJ_k",
    5: "9lP8FQgtaQQ",
    6: "mABPWqqtz8M",
    7: "YIhJgaittnM",
    8: "NjMJwewmcfA",
    9: "fdLg09p4s6w"

}


function cerrar() {
    IFRAME.innerHTML ="";
    LGT.classList.remove("lgt-isActive");
}

let openlgt = () => LGT.classList.add("lgt-isActive");

function mover(e) {
    let width = window.innerWidth;
    let id = e.target.getAttribute("id");
    let cards = 5;
    
    if (width <= 720) cards = 4;
    
    if (!id) return;
    
    (id == "next")
    ? contador++
    : contador--
    
    if (contador < 0 || contador > (10 - cards)) contador = 0;
    
    let ancho = 10 * contador;

    CARRUSEL.style.transform = `translatex(-${ancho}%)`;
}


// Crea el evento click en las imagenes para abrir el IFRAME
IMGLIST.forEach((elemento, i) => {
    
    // if(window.innerWidth<=500) return;    //Esta linea evita que se abran los videos en resoluciones menor a 500px

    IMGLIST[i].addEventListener("click", () => {
        LGT.classList.add("lgt-isActive");
        IFRAME.innerHTML = `<iframe class="lgt__iframe-2" width="560" height="315" src="https://www.youtube.com/embed/${TRAILER[i]}?autoplay=1&mute=1&controls=1" title="YouTube video player" frameborder="0" allow="autoplay; fullscreen; loop" allowfullscreen data-item="5"></iframe>`
    });
})


PREV.addEventListener("click", mover);
NEXT.addEventListener("click", mover);
CLOSE.addEventListener("click", cerrar);



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



//funcion para agregar suscriptor

const form=document.querySelector("#form")

document.getElementById("btnForm").addEventListener("click", async function(event){
    event.preventDefault()

    let nombre_ingresado= document.querySelector("#nombre").value;
    let email_ingresado = document.getElementById("email").value;
    let urlform="https://formspree.io/f/mwkdjgrl";
    var emailtest = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email_ingresado);
    var nombreTest = /^[a-zA-Z]+$/.test(nombre_ingresado); 
    
  
    if(!emailtest || !nombreTest || !email_ingresado.trim() || !nombre_ingresado.trim()){
        event.preventDefault()
        alert("Por favor,ingrese un nombre o email valido.")
        return false
    }


    let datos_suscriptor = {
        nombre: nombre_ingresado,
        email: email_ingresado}


    //Envio de formulario

    const fd= new FormData(form)

    const response = await fetch(urlform, {
        method: 'POST',
        body: fd,
        headers: {Accept:'application/json'}
    })

    if(response.ok){
        alert("Formulario Enviado")
    }
    else{
        alert("NO se pudo enviar el formulario")
    }

    //Envio de datos para la BBDD
    
    let url = "http://localhost:5000/registro"
    var options = {
        body: JSON.stringify(datos_suscriptor),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "/templates/personas.html";
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
       
})
