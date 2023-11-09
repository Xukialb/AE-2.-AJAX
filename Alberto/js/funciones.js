const URL_DESTINO = "http://localhost:5500/AE-2.-AJAX/Alberto/"
const RECURSO = "tamanios_ingredientes.json"

function enviarpeticionAjax() {
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)//Asincrono
    xmlHttp.send() //podemos poner null o no, es lo mismo

    //esta funcion de callback se ejecutara cuando se haya procesado la respueta HTTP
    xmlHttp.onload = function () {
        procesarRespuesta(this.responseText)
    }

    xmlHttp.onerror = function () {
        alert("No se pueden cargar los datos!")
    }

}

function procesarRespuesta(jsonDoc) {
    //Convertimos un texto a un objeto JSON
    var objetoJson = JSON.parse(jsonDoc)
    //Podemos hacer lo contrario con "JSON.stringify(obj)"
    console.log(objetoJson)

    var table = "<tr><th>Tamanio</th></tr>";
    var arraytamanios = objetoJson.TAMANIOS;
    var arrayingredientes = objetoJson.INGREDIENTES;


    // Mostrar tamaños de pizza como botones de radio
    var conTam = document.getElementById("tamanios");
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

}
