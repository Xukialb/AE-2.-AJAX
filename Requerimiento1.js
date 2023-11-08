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

function procesarRespuesta(jsonDoc) {
    const objetoJson = JSON.parse(jsonDoc);
    console.log(objetoJson);

    var arrayTam = objetoJson.tamanio;
    var arrayIng = objetoJson.ingredientes;

    // Mostrar tamaños de pizza como botones de radio
    var conTam = document.getElementById("contenedor1");
    var tamDiv = document.createElement("div");
    tamDiv.innerHTML = "Elige un tamaño de pizza <br/>";

    for (let i = 0; i < arrayTam.length; i++) {
        var radioB = document.createElement("input");
        radioB.type = "radio";
        radioB.name = "tamañoPizza";
        radioB.id = arrayTam[i].nombre;
        radioB.value = arrayTam[i].nombre;

        var radioL = document.createElement("label");
        radioL.textContent = arrayTam[i].nombre;

        tamDiv.appendChild(radioB);
        tamDiv.appendChild(radioL);
    }

    conTam.appendChild(tamDiv);

    // Mostrar ingredientes como casillas de verificación
    var conIng = document.getElementById("contenedor2");
    var ingDiv = document.createElement("div");
    ingDiv.innerHTML = "Selecciona los ingredientes de tu preferencia<br/>";

    for (let i = 0; i < arrayIng.length; i++) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredientes";
        checkbox.id = arrayIng[i].nombre;
        checkbox.value = arrayIng[i].nombre;

        var label = document.createElement("label");
        label.textContent = arrayIng[i].nombre;

        ingDiv.appendChild(checkbox);
        ingDiv.appendChild(label);
    }

    conIng.appendChild(ingDiv);
}
document.addEventListener("click", function() {
    mostrarTotal(objetoJson); });

enviarPeticionAsincrona();



