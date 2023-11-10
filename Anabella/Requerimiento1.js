const url= "http://localhost:5500/Anabella/";
const recurso = "Requerimiento1.json";

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

    xmlHttp.open('GET', url+recurso, true);
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
        console.log(ingDiv)
    }

    enviarPeticionAsincrona();

    document.addEventListener("DOMContentLoaded", function() {
    let refresh = document.getElementById("refresh");
    refresh.addEventListener("click", _ => {
        location.reload();
        
    });
    });

    function mostrarTotal() {
        // Valido campos de datos obligatorios
      if (nombre.value.trim() === "" || direccion.value.trim() === "") {
        alert("Los campos de datos son obligatorios");
        return false;
  }

  var numeroTelefono = telefono.value.trim();
  var numTel = /^[0-9]{9}/;

// Valido que el número de teléfono es obligatorio
  if (numeroTelefono === "") {
      alert("El campo de teléfono es obligatorio");
      return false;
  }

// Valido que el número de teléfono tiene exactamente 9 dígitos
  if (!numTel.test(numeroTelefono)){
      alert("El número de teléfono debe tener nueve dígitos");
      return false;
}

//Obtengo el valor del campo y eleimino espacios en blanco . Valido que el email es obligatorio
  if (email.value.trim()==="") {
      alert("El campo de email es obligatorio");
      return false;
}

//Valido que los campos ingresados en el email son válidos
  var correo = /^[A-Za-z0-9._-]+@[a-z]+\.[a-z]+$/;

//Agrego una condición que permita mostrar un mensaje de alerta cuando el correo no es válido
  if (!correo.test(email.value.trim())) {
      alert("Ingresa una dirección de correo electrónico válida");
      return false;
  }  

// Valido que se haya elegido un tamaño de pizza
  var tamanio = document.getElementsByName("tamanio");
  var seleccionTam = false;

//Con el bucle for me aseguro de recorrer el array de tamaños
  for (var i = 0; i < tamanio.length; i++) {
      if (tamanio[i].checked) {
      seleccionTam = true;
      break;
      }
  }
  if (!seleccionTam) {
      alert("Debe seleccionar un tamaño de pizza");
      return false;
  }

// Valido que se haya seleccionado al menos un ingrediente para la pizza
  var ingredientes = document.getElementsByName("ingredientes");
  var seleccionIng = false;
      for (var i = 0; i < ingredientes.length; i++) {
          if (ingredientes[i].checked) {
              seleccionIng = true;
              break;
          }
      }
      if (!seleccionIng) {
          alert("Debe seleccionar al menos un ingrediente");
          return false;
      }
        
        console.log("Función mostrar Total");
        let precioPizza = 0;
      

        // Obtengo el tamaño de la pizza seleccionado
        var tamanio = document.getElementsByName("tamanio");
        
            for (let i = 0; i < tamanio.length; i++) {
                if (tamanio[i].checked) {
                        console.log("Tamaño seleccionado:", tamanio[i].value);
                        precioPizza = parseInt(tamanio[i].precio);
                } 
                }
            console.log("Precio de la pizza según el tamaño:", precioPizza);

    // Obtengo los ingredientes seleccionados
        var ingredientes = document.getElementsByName("ingredientes");

        let ingredientesPrecio = 0;

            for (let i = 0; i < ingredientes.length; i++) {
                if (ingredientes[i].checked) {
                    console.log("Ingrediente seleccionado:", ingredientes[i].value);
                    ingredientesPrecio += parseInt(ingredientes[i].precio);
                }
            }
            console.log("Precio de los ingredientes seleccionados:", ingredientesPrecio);

        let precioTotal = precioPizza + ingredientesPrecio;
        alert("El importe es: " + precioTotal + "€");
        console.log("Precio total:", precioTotal);
    }

    document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("total").addEventListener("click", mostrarTotal);
    });