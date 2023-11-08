const url = "http://localhost:5500/Requerimiento1.json";

const url = "http://localhost:5500/Requerimiento1.json";

function enviarPeticionAsincrona() {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                procesarRespuesta(xmlHttp.responseText);
            } else {
                alert("¡Error al cargar datos!");
            }
        }
    };

    xmlHttp.open('GET', url, true);
    xmlHttp.send();
}

function procesarPedido(jsonDoc) {
    const objetoJson = JSON.parse(jsonDoc);
    console.log(objetoJson);

    var arrayTam = objetoJson.tamanio;
    var arrayIng = objetoJson.ingredientes;
    let precioPizza = 0;

    // Obtengo el tamaño de la pizza seleccionado
    var tamPizza = document.getElementsByName("tamanio");
    for (let i = 0; i < tamPizza.length; i++) {
        if (tamPizza[i].checked) {
            precioPizza = parseInt(arrayTam[i].precio);
        }
    }

    // Obtengo los ingredientes seleccionados
    let ingredientesPrecio = 0;
    var ingSel = document.getElementsByName("ingredientes");
    for (let i = 0; i < ingSel.length; i++) {
        if (ingSel[i].checked) {
            ingredientesPrecio += parseInt(arrayIng[i].precio);
        }
    }

    let precioTotal = precioPizza + ingredientesPrecio;
    alert("El importe es: " + precioTotal + "€");
}

document.getElementById("boton").addEventListener("click", function () {
    procesarPedido(jsonDoc);
});

enviarPeticionAsincrona();