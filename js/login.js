const usuario= "admin";
const contraseña= "1234";
const login= document.querySelector("#login");



login.addEventListener("click", ()=>{
    
    const usuario_ingresado= document.querySelector("#usuario").value
    const contraseña_ingresado= document.querySelector("#contraseña").value
    
    
    if(usuario==usuario_ingresado && contraseña==contraseña_ingresado){
    
        window.location.href = "/templates/personas.html";
    }
    else{
        alert("Usuario o contraseña incorretos!")
        window.location.href = "../index.html";
    }
});