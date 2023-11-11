const URL_DESTINO = "http://localhost:5500/Alberto/"
const RECURSO = "tamanios_ingredientes.json"

function peticionAjax() {
    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)//Obtenemos el valor en texto
            } else {
                alert("No se ha podido cargar la peticion AJAX!")
            }
        }
    }

    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)

}

//funcion que manipula el DOM para añadir a los DIV la respuesta del servidor
function procesarRespuesta(respuesta) {
    var objetoJson = JSON.parse(respuesta);
    console.log(objetoJson);

    var arrayTam = objetoJson.TAMANIOS;
    var arrayIng = objetoJson.INGREDIENTES;

    // Mostrar tamaños de pizza como botones de radio
    var conTam = document.getElementById("TAMANIOS");
    var tamDiv = document.createElement("div");
    tamDiv.innerHTML = "Elige un tamaño de pizza <br/>";

    for (let i = 0; i < arrayTam.length; i++) {
        var radioB = document.createElement("input");
        radioB.type = "radio";
        radioB.name = "tamanioPizza";
        radioB.id = arrayTam[i].nombre;
        radioB.value = arrayTam[i].nombre;

        var radioL = document.createElement("label");
        radioL.textContent = arrayTam[i].nombre;

        tamDiv.appendChild(radioB);
        tamDiv.appendChild(radioL);
    }

    conTam.appendChild(tamDiv);

    // Mostrar ingredientes como casillas de checkbox
    var conIng = document.getElementById("INGREDIENTES");
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

function enviarPedido() {
    var tamañoPizza = document.getElementById('tamanioPizza').value;
    var ingredientes = document.getElementById('ingredientes').value;
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'procesar_pedido.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resultado = document.getElementById('resultado');
          resultado.innerHTML = xhr.responseText;
        } else {
          console.error('Error en la solicitud.');
        }
      }
    };
  
    var datos = 'tamañoPizza=' + tamañoPizza + '&ingredientes=' + ingredientes;
    xhr.send(datos);
  }

peticionAjax();