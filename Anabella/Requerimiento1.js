const url = "Requerimiento1.json";

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

    xmlHttp.open('GET', url, true);
    xmlHttp.send();
}

function procesarRespuesta(jsonDoc) {
    const objetoJson = JSON.parse(jsonDoc);
    console.log(objetoJson);

    let arrayTam = objetoJson.tamanio;
    let arrayIng = objetoJson.ingredientes;

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
}

enviarPeticionAsincrona();
