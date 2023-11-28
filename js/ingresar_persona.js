function guardar() {
    let email_ingresado = document.getElementById("email").value

    console.log(email_ingresado );

    let enviar_email = {
        email: email_ingresado,
        
    }
    console.log(enviar_email);
    
    let url = "https://gdticket.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(enviar_email),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "./personas.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}