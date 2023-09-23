

const CONTENEDOR=document.querySelector("#contenedor");
const ACCION=document.querySelector("#accion");
const PUNTO=document.querySelectorAll("#punto");
let movimiento=0;
const posicion=[0,-18,-33.32,-50];


/*function alerta(e){
    if(e.target.dataset.item) console.log(e.target.dataset.item);
}
window.addEventListener("mouseover", alerta);*/

ACCION.addEventListener("click", (e)=>{
    movimiento= e.target.dataset.item;
    
    if(!movimiento){return};

    PUNTO.forEach((cadaPunto,i)=>{
        cadaPunto.classList.remove("news__punto--active");
    })
    
    PUNTO[movimiento].classList.add("news__punto--active")

CONTENEDOR.style.transform=`translatex(${posicion[movimiento]}%)`;
})

