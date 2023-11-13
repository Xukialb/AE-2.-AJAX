const URL_DESTINO = "http://localhost:5500/Cristina/"
const RECURSO = "pizzeria.json"

function peticionAsincrona() {
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
function procesarRespuesta(jsonDoc) {
  let objetoJson = JSON.parse(jsonDoc);
  console.log(objetoJson);


  let arrayTamanos= objetoJson.tamanos;
  let arrayIngredientes =objetoJson.ingredientes;

  let divTiPizza = document.getElementById("tamanoPizza");
  let tamanoDiv = document.createElement("div");
  tamanoDiv.innerHTML = "Tamanios pizza <br/>"

  for (let i = 0; i < arrayTamanos.length; i++) {
    let radio= document.createElement("input");
    radio.type = "radio";
    radio.name = "tamanoPizza";
    radio.id = arrayTamanos[i].nombre;
    radio.value = arrayTamanos[i].precio;

    let  radioLabel = document.createElement("label");
    radioLabel.textContent = arrayTamanos[i].nombre;

    tamanoDiv.appendChild(radio);
    tamanoDiv.appendChild(radioLabel);
  }
  divTiPizza.appendChild(tamanoDiv);
    
  

  let divIngredientes = document.getElementById("ingredientes");
  let ingredientesDiv = document.createElement("div");
  ingredientesDiv.innerHTML = "Selecciona los ingredientes de tu preferencia <br/>";

  for (let i = 0; i < arrayIngredientes.length; i++) {
    let checkbox= document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "ingredientes";
    checkbox.id = arrayIngredientes[i].nombre;
    checkbox.value = arrayIngredientes[i].precio;

    let labelcheckbox = document.createElement("label");
    labelcheckbox.textContent = arrayIngredientes[i].nombre;

    ingredientesDiv.appendChild(checkbox);
    ingredientesDiv.appendChild(labelcheckbox);

  }
    divIngredientes.appendChild(ingredientesDiv);


    let sumabutton = document.getElementById("pagar");
    sumabutton.onclick = function() {
        enviarPeticion();
    }
function enviarPeticion() {
    let precioPizza =0;
  ///////
}
peticionAsincrona();
}