window.onload= function(){
    //Añado algo de CSS al formulario
      document.body.style.textAlign = "left";
      document.body.style.width = "30%";
      document.body.style.margin = "auto";
      document.body.style.backgroundColor = "#FFB748";
  
    //LLamo a la función cuando la página esté cargada
      enviarPeticionAsincrona();
  }
  
  //Generamos petición al servidor
  const URL_DESTINO = "http://localhost:5500/Act1/AE-2.-AJAX/David/"
  const RECURSO = "pizzas.json"
  
      function enviarPeticionAsincrona() {
  
          let xmlHttp = new XMLHttpRequest()
  
          xmlHttp.onreadystatechange = function () {
              if (this.readyState == 4) {
                  if (this.status == 200) {
                      procesarRespuesta(this.responseText)//Obtenemos el valor en texto
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

        var arraypizzas=objetoJson.Pizzas;
        var contenedor = document.getElementById("container");
        document.body.appendChild(contenedor);
       for ( var i=0; i < arraypizzas.length ; i++){
       
            var salida= arraypizzas[i].nombre;
            var parrafo = document.createElement('p');

            parrafo.textContent = salida;
            contenedor.appendChild(parrafo)

       }
      

       
       
        //alert("Los campos de datos son obligatorios");
      }