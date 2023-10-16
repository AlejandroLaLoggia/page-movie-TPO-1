

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

