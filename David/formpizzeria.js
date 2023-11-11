window.onload= function(){
  //Añado algo de CSS al formulario
    document.body.style.textAlign = "left";
    document.body.style.width = "30%";
    document.body.style.margin = "auto";
    document.body.style.backgroundColor = "#FFB748";

  //LLamo a la función cuando la página esté cargada
  enviarPeticionAsincrona();

    //Busco el div por ID dentro del formulario
    var dinamico = document.getElementById("dinamico");
    //Agrego el div al al body
    document.body.appendChild(dinamico);

       
     
}
 //Generamos petición al servidor
 const URL_DESTINO = "http://localhost:5500/Act1/AE-2.-AJAX/David//"
 const RECURSO = "pizzas.json"

     function enviarPeticionAsincrona() {

         let xmlHttp = new XMLHttpRequest()

         xmlHttp.onreadystatechange = function () {
             if (this.readyState == 4) {
                 if (this.status == 200) {
                  //almaceno la respuesta del servidor para poder consultarla más adelante
                    var almacenar = procesarRespuesta(this.responseText)//Obtenemos el valor en texto
                 } else {
                     alert("ZASCA!")
                 }
             }
         }

         xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
         xmlHttp.send(null)
     }

  
     function procesarRespuesta(jsonDoc){

      var objetoJson = JSON.parse(jsonDoc)
      console.log(objetoJson)
      
      var arraypizzas = objetoJson.Pizzas;
    
      for (var i = 0; i < arraypizzas.length ; i++)
      {
        var nompizza=arraypizzas[i].nombre

        var namepizza=document.createElement('span');
          namepizza.textContent=" "+nompizza+": ";
         
        dinamico.appendChild(namepizza);  

        

        //Creamos el botón
        var pizza = document.createElement("input");
          pizza.setAttribute("name", "tamano");
          pizza.setAttribute("type", "radio");
          pizza.setAttribute("id", arraypizzas[i].nombre)
          pizza.setAttribute("value",arraypizzas[i].precio);

      //Añadimos el botón como hijo del div dinamico
          console.log(nompizza);
        dinamico.appendChild(pizza);

      }
      //Metemos un espacio
      
      //Extraemos la lista de ingredientes para mostrarla
      var ingredient = objetoJson.Ingredientes.lista
      var br = document.createElement("br");
      dinamico.appendChild(br);
      var br = document.createElement("br");
      dinamico.appendChild(br);


      for (var i = 0; i < ingredient.length ; i++ ){
        
        //Texto ingredientes
        var textingredient = document.createElement('span');
          textingredient.textContent =" " + ingredient[i].Nombre;
        dinamico.appendChild(textingredient);



         //Creamos los ingredientes
        var ingredientes = document.createElement("input");
        ingredientes.setAttribute("name", "ingrediente");
        ingredientes.setAttribute("type", "checkbox");
        ingredientes.setAttribute("id", ingredient[i].Nombre);
        ingredientes.setAttribute("value", ingredient[i].Precio)

        dinamico.appendChild(ingredientes);
      }   


      //Llamamos a la función mostrartotal cuando se pulse el botón
      var totalboton = document.getElementById("total");
      totalboton.onclick=function(){
                      mostrarTotal();
      }


      function mostrarTotal() {
        var precioPizza = 0;
        console.log("DENTRO DEL MOSTRAR TOTAL")
      // Obtener el tamaño de la pizza seleccionado
        var tamanio = document.getElementsByName("tamano");
  
        for (let i = 0; i < tamanio.length; i++) {
            if (tamanio[i].checked) {
              console.log("HAY UN BOTON PULSADO")
              console.log(tamanio[i].id)
                if (tamanio[i].value == 5) {
                    precioPizza = 5;
              } 
                else if (tamanio[i].value == 10) {
                    precioPizza = 10;
              } 
                else if (tamanio[i].value == 15) {
                    precioPizza = 15;
              }
          }
      }
  
      // Obtener los ingredientes seleccionados
      var ingredientes = document.getElementsByName("ingrediente");
  
      var ingredientesPrecio = 0;
  
      for (let i = 0; i < ingredientes.length; i++) {
          if (ingredientes[i].checked) {
            console.log(ingredientes[i].value);
              vingredient=ingredientes[i].value;
              ingredientesPrecio =+ vingredient;
          }
      }
  
      let precioTotal = precioPizza + ingredientesPrecio;
      alert("El importe es: " + precioTotal + "€");
  
    }
  
  

    }
/*
function validarForm(){
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var direccion = document.getElementById("direccion");
  
  // Validar campos de datos obligatorios
    if (nombre.value.trim() === "" || apellidos.value.trim() === "" || direccion.value.trim() === "") {
        alert("Los campos de datos son obligatorios");
        return false;
    }

  var numeroTelefono = telefono.value.trim();

  // Validar que el número de teléfono es obligatorio
    if (numeroTelefono === "") {
        alert("El campo de teléfono es obligatorio");
        return false;
  }

  // Validar que el número de teléfono tiene exactamente 9 dígitos
    if (numeroTelefono.length !== 9 || isNaN(numeroTelefono)) {
        alert("El número de teléfono debe tener nueve dígitos");
        return false;
  }

  // Validar que se haya elegido un tamaño de pizza
  var tamanio = document.getElementsByName("tamanio");
  var seleccionTam = false;
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

  // Validar que se haya seleccionado al menos un ingrediente para la pizza
  var ingredientes = document.getElementsByName("ingrediente");
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

  mostrarTotal();
  // Si todas las validaciones pasan, el formulario se envía
  return true;   
  }
*/
/*
  function mostrarTotal() {
      let precioPizza = 0;

    // Obtener el tamaño de la pizza seleccionado
      var tamanio = document.getElementsByName("tamanio");

      for (let i = 0; i < tamanio.length; i++) {
          if (tamanio[i].checked) {
              if (tamanio[i].value === "pequenia") {
                  precioPizza = 5;
            } 
              else if (tamanio[i].value === "mediana") {
                  precioPizza = 10;
            } 
              else if (tamanio[i].value === "grande") {
                  precioPizza = 15;
            }
        }
    }

    // Obtener los ingredientes seleccionados
    var ingredientes = document.getElementsByName("ingrediente");

    let ingredientesPrecio = 0;

    for (let i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i].checked) {
            ingredientesPrecio += 1;
        }
    }

    let precioTotal = precioPizza + ingredientesPrecio;
    alert("El importe es: " + precioTotal + "€");

  }
  */



  



   

  



