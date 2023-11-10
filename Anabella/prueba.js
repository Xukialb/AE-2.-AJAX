const url = "http://localhost:5500/Anabella/";
const recurso = "Requerimiento1.json";
let tamanioOriginal; 
let ingredientesOriginal; 

function enviarPeticionAsincrona(callback) {
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

    xmlHttp.open('GET', url + recurso, true);
    xmlHttp.send();
}

function procesarRespuesta(jsonDoc) {
    const objetoJson = JSON.parse(jsonDoc);
    console.log(objetoJson);

    let arrayTam = objetoJson.tamanio;
    let arrayIng = objetoJson.ingredientes;

    tamanioOriginal = arrayTam; 
    ingredientesOriginal = arrayIng; 

    // Mostrar tamaños de pizza como botones de radio
    let conTam = document.getElementById("contenedor1");
    const tamDiv = document.createElement("div");
    tamDiv.innerHTML = "Elige un tamaño de pizza <br/>";

    for (let i = 0; i < arrayTam.length; i++) {
        let radioB = document.createElement("input");
        radioB.type = "radio";
        radioB.name = "tamanio";
        radioB.id = arrayTam[i].nombre;
        radioB.value = arrayTam[i].nombre;

        let radioL = document.createElement("label");
        radioL.textContent = arrayTam[i].nombre;

        tamDiv.appendChild(radioB);
        tamDiv.appendChild(radioL);
    }

    conTam.appendChild(tamDiv);
    console.log(tamDiv);

    // Mostrar ingredientes como casillas de verificación
    let conIng = document.getElementById("contenedor2");
    const ingDiv = document.createElement("div");
    ingDiv.innerHTML = "Selecciona los ingredientes de tu preferencia<br/>";

    for (let i = 0; i < arrayIng.length; i++) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredientes";
        checkbox.id = arrayIng[i].nombre;
        checkbox.value = arrayIng[i].nombre;

        let label = document.createElement("label");
        label.textContent = arrayIng[i].nombre;

        ingDiv.appendChild(checkbox);
        ingDiv.appendChild(label);
    }

    conIng.appendChild(ingDiv);
    console.log(ingDiv);
}

enviarPeticionAsincrona();

function mostrarTotal() {
    // ... (código anterior)

    // Valida que se haya elegido un tamaño de pizza
    var tamanio = document.getElementsByName("tamanio");
    var seleccionTam = false;
    var precioPizza = 0;

    // Con el bucle for me aseguro de recorrer el array de tamaños
    for (var i = 0; i < tamanio.length; i++) {
        if (tamanio[i].checked) {
            for (let j = 0; j < tamanioOriginal.length; j++) {
                if (tamanioOriginal[j].nombre === tamanio[i].value) {
                    precioPizza = parseInt(tamanioOriginal[j].precio);
                    break;
                }
            }
            seleccionTam = true;
            break;
        }
    }

    if (!seleccionTam) {
        alert("Debe seleccionar un tamaño de pizza");
        return false;
    }

    // ... (código posterior)
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("total").addEventListener("click", mostrarTotal);
});