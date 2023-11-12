
//Cargamos todo lo que hay dentro una vez se haya cargado la web.
window.onload = function () {

  //creamos los diferentes div y botones que tenemos en el html
  var bottomform = document.getElementById("bottomform");
  var contenedor = document.getElementById("contenedor");
  //div de los dos botones (total - refrescar)
  var botones = document.getElementById("botones");
  //botón refrescar
  var refrescar = document.getElementById("refrescar");

  //Creamos el EventListener para que al hacer click en el botón con refrescar
  //nos deje el div (bottomform) en blanco y posteriormente procese de nuevo la petición
  //al json para volver a traer los tamaños de pizzas y sus ingredientes sin tocar nada más
  refrescar.addEventListener("click", function () {
    //con las dobles comillas en blanco dejamos limpio el div y posteriormente llamamos 
    //a la función de petición para solicitar de nuevo el json
    bottomform.innerHTML = ""; 
    enviarPeticionAsincrona();
  });

  //Llamamos a la función de petición
  enviarPeticionAsincrona();

  //Hacemos hijos el bottomform y los botones
  contenedor.appendChild(bottomform);
  contenedor.appendChild(botones);
}

//Insertamos la URL donde vamos a tener el recurso .json
const URL_DESTINO = "http://localhost:5500/Act1/AE-2.-AJAX/David//"
//indicamos el nombre dle recurso
const RECURSO = "pizzas.json"

//Creamos la petición, en nuestro caso es Asíncrona
function enviarPeticionAsincrona() {

  //Creamos el objeto XMLHttpRequest - Esto es obligatorio en cada petición que hagamos
  let xmlHttp = new XMLHttpRequest()

  // Solicitamos el estado de la petición con .onreadystatechange
  xmlHttp.onreadystatechange = function () {
    //Si el estado que devuelve la petición es 4 comprobamos si su estado es 200
    if (this.readyState == 4) {
      //Si el estado de la petición es 200, todo ha salido bien, tendremos nuestro JSON
      if (this.status == 200) {
        //Llamamos a la función que va a procesar el .Json, y le pasamos le .Json con
        //this.responseText.
        procesarRespuesta(this.responseText);
      } else { // En caso de no responder con status 200 va a generar un error cualquiera
              //Si esto se da, le decimos que nos saque un alert con un "ZASCA!"
        alert("ZASCA!")
      }
    }
  }
  //Al final tenemos que recuperar la url y el recurso usando GET, tenemos que marcar al final
  //como true la petición y que sino no será una petición asincrona
  xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
  //En el envío de datos marcamos null porque no vamos a mandar datos al .Json, solo vamos
  //a sacar datos de este.
  xmlHttp.send(null)
}
//En esta función vamos a procesar el texto que nos devuelve el .Json
//Indicamos que le tenemos que pasar el jsonDoc que más arriba hemos indicado como (this.responseText);
function procesarRespuesta(jsonDoc) {
  //Metemos lo que nos devuelve la consulta del .Json en una variable llamada "objetoJson"
  //A la vez parseamos lo que contiene.
  var objetoJson = JSON.parse(jsonDoc);
  
  //Dentro del Json tenemos 2 objetos, las Pizzas y los ingredientes, nosotros vamos a meter
  //El Objeto de las pizzas dentro de una variable, para llegar hasta las pizzas tenemos que 
  //Entrar al objetoJson. e indicar a que queremos acceder, en nuestro caso a las Pizzas
  // objetoJson.Pizzas
  var arraypizzas = objetoJson.Pizzas;

  //Ya tenemos las pizzas en una variable, si nos vamos a nuestro Json, vemos que tenemos un 
  //Array con las pizzas y ya dentro de cada una encontramos su precio y tamaño.
  //Ahora lo que aremos será recorrer este array de 3 lugares para ir creando cada botón
  for (var i = 0; i < arraypizzas.length; i++) {
    //Creamos esta variable para meter ahí el nombre de las pizzas del Json
    var nompizza = arraypizzas[i].nombre;

    //En esta variable metemos le asignamos la etiqueta span para meter en una misma línea
    //todos tamaños de las pizzas, y entre nombre y nombre metemos un espacio
    var namepizza = document.createElement('span'); 
    namepizza.textContent = " " + nompizza + ": ";

    //Lo hacemos como hijo del div al que pertenece 
    bottomform.appendChild(namepizza);

    //Creamos el input de las pizzas y le asignamos sus atributos correspondientes
    var pizza = document.createElement("input");
    pizza.setAttribute("name", "tamano");
    pizza.setAttribute("type", "radio");
    //Tanto el id como el value los extraemos de nuestro arraypizzas(que sería el objeto Pizzas dentro del Json) y ya 
    //Dentro de este array extraemos el nombre, en este caso "i" corresponde a una posición del array y esto corresponde
    //a un tamaño de pizza de los 3 que tenemos, lo mismo aplica con el precio
    pizza.setAttribute("id", arraypizzas[i].nombre)
    pizza.setAttribute("value", arraypizzas[i].precio);
    bottomform.appendChild(pizza);
  }

  //Ahora vamos a crear los ingredientes 

  //Creamos esta variable para guardar ahí el array de los ingredientes que tenemos
  var ingredient = objetoJson.Ingredientes.lista

  //Metemos varios enter para ajustarlo bien
  var br = document.createElement("br");
  bottomform.appendChild(br);
  var br = document.createElement("br");
  bottomform.appendChild(br);
  
//Al igual que con los tamaños de las pizzas repetimos el procedimiento pero con los ingredientes, es exáctamente igual
  for (var i = 0; i < ingredient.length; i++) {
    var textingredient = document.createElement('span');
    textingredient.textContent = " " + ingredient[i].Nombre;
    bottomform.appendChild(textingredient);

    var ingredientes = document.createElement("input");
    ingredientes.setAttribute("name", "ingrediente");
    ingredientes.setAttribute("type", "checkbox");
    ingredientes.setAttribute("id", ingredient[i].Nombre);
    ingredientes.setAttribute("value", ingredient[i].Precio);
    bottomform.appendChild(ingredientes);
  }

  //Una vez hemos creado los tamaños de las pizzas y sus ingredientes
  //vamos a crear la acción que va a ejecutar el botón del total al ser pulsado

  //vamos a extraer el botón total por su ID
  var totalboton = document.getElementById("total");

  //Ya podemos manejar este botón, con el onclick le indicamos que cuando se pulse haga x acción que nosotros indiquemos
  //en este caso va a llamar a la fucnión validarForm.
  totalboton.onclick = validarForm;


  //Tenemos que validar nuestro formulario
  function validarForm(){

    //Extraemos el ID de cada caja de texto que vamos a comprobar y lo pasamos a una variable
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var direccion = document.getElementById("direccion");
  
  // Validar campos de datos obligatorios mediante este if lo que hacemso es comprobar que ninguna de estas variables
  //estén en blanco, con .trim lo que hacemos es eliminar los espacios al principio y final
    if (nombre.value.trim() === "" || apellidos.value.trim() === "" || direccion.value.trim() === "") {

        //En caso de estar alguno de estos 3 campos vacío nos tirará este alert 
        alert("Los campos de datos son obligatorios");
        return false;
    }

  //Eliminamos los espacios del número de teléfono para posteriormente validarlo
  var numeroTelefono = telefono.value.trim();

  // Validamos el teléfono de la misma forma que el texto solo que aquí hemos añadido una doble validación
  //No solo comprobamos que no esté vacío, sino que también comprobamos que tiene por lo menos 9 dígitos y que sean números
    if (numeroTelefono === "") {
        alert("El campo de teléfono es obligatorio");
        return false;
  }

  // Validar que el número de teléfono tiene exactamente 9 dígitos
    if (numeroTelefono.length !== 9 || isNaN(numeroTelefono)) {
        alert("El número de teléfono debe tener nueve dígitos");
        return false;
  }

// Ahora vamos a validar si el usuario a seleccionado algún tamaño de pizza
  var tamanio = document.getElementsByName("tamano");
  //Ponemos la variable seleccionTam en false
  var seleccionTam = false;
      //Con este bucle vamos a recorrer nuestro array de tamaños de pizza (3 lugares), y comprobaremos 
      //uno a uno si hay alguno seleccionado, si hay alguno seleccionado se cambiará a true la variable
      //seleccionTam y por tanto romperemos el bucle y nos saldremos de este.
      for (var i = 0; i < tamanio.length; i++) {
          if (tamanio[i].checked) {
          seleccionTam = true;
          break;
    }
  }

  //Si la selección del tamaño no devuelve TRUE loq ue haremos será sacar un alert indicando error
  if (!seleccionTam) {
      alert("Debe seleccionar un tamaño de pizza");
      return false;
  }

//Al igual que hemos hecho con el tamaño hacemos ocn los ingredientes
  var ingredientes = document.getElementsByName("ingrediente");

  //Creamos una variable con valor false
  var seleccionIng = false;

      //Creamos un bucle en el que recorremos el array de ingredientes

      for (var i = 0; i < ingredientes.length; i++) {

        //Con un if vamos comprobando si hay alguno marcado, en cuanto encuentre uno seleccionado nos cambia
        //el valor de seleccionIng a True y nos sacará del for.
          if (ingredientes[i].checked) {
          seleccionIng = true;
          break;
      }
  }
        //En caso de que el if anterior no nos de TRUE deberá de sacarnos un mensaje de errror
        if (!seleccionIng) {
            alert("Debe seleccionar al menos un ingrediente");
            return false;
  }


  // Si todas las validaciones pasan, llama a la función para mostrar el total 
  mostrarTotal();

  //marcamos return true para que se envíe el formulario
  return true;   
  }

//Mostraremos el total del coste de Pizza + ingrediente
  function mostrarTotal() {

    //Creamos una variable donde tendremos almacenado el precio del tamaño de la pizza y la iniciamos a 0
      var precioPizza = 0;
      
    // almacenamos todos los botones con atributo name "tamano" en una variable llamada tamanio
      var tamanio = document.getElementsByName("tamano");

      //Con este bucle for lo que hacemos es recorrer el array de tamanio
      for (let i = 0; i < tamanio.length; i++) {
          //Vamos en cada lugar del array tenemos un tamaño de pizza
          //Vamos a comprobar si cada tamaño ha sido seleccionado, cuando haya uno seleccionado 
          //asignamos ese valor a la variable precioPizza
          if (tamanio[i].checked) {
              //Aquí lo que estamos haciendo es averiguar cual ha seleccinado el usuario, estamos dentro de un if 
              //que se ejecuta en bucle hasta encontrar un botón seleccionado, cuando lo encuentre, este va a ejecutar varios if
              //En los que vamos a comprobar si el valor de ese botón seleccionado es 5,10,15, dependiendo del valor sabemos
              //que nuestra pizza es pequeña, mediana o grande, de ser otro caso podríamos identificarlo no por su value sino por su id
              //ya que este sería el nombre de cada pizza o por un número de referencia, en este caso era fácil sacarlo por el value
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

    //Metemos todo sos radio button de ingredientes en una variable llamada ingredientes
    var ingredientes = document.getElementsByName("ingrediente");

      //Creamos la variable para almacenar el precio de los ingredientes y la iniciamos a 0;
    var  ingredientesPrecio = 0;

    //Es similar a las pizzas, vamos recorriendo el array de los ingredientes que tenemos
    for (let i = 0; i < ingredientes.length; i++) {
        //cuadno encuentra un ingrediente seleccionado va a proceder a parsear su valor (para que lo sume y no lo concatene con el de la pizza)
        
        if (ingredientes[i].checked) {
          //Aquí estamos parseando el valor del ingrediente seleccionado
           var vingredient=parseFloat(ingredientes[i].value);
           //Indicamos que sume el ingrediente a nuestra variable que almacena el coste de los ingredientes
            ingredientesPrecio += vingredient;
        }
    }

    //Finalmente sumamos el precio del tamaño y de los ingredientes y lo sacamos por un alert
    let precioTotal = precioPizza + ingredientesPrecio;
    alert("El importe es: " + precioTotal + "€");

  }

  }

