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

    var refrescar = document.getElementById("refrescar");
    refrescar.onclick=function(){
                        enviarPeticionAsincrona();
                      }
      /*
    let total=document.getElementById("total");
  
 //Extraemos cada botón en una variable para posteriormente asignar un valor
 var bacon = document.getElementById("Tomate");
 var queso = document.getElementById("Queso");
 var tomate = document.getElementById("Pepperoni");
 var oregano = document.getElementById("Oregano");

 var tamanoselect;
 var totalcuenta;
 var ingredienteselect;

 var grandeselect = document.getElementById("Grande");
 var medianaselect = document.getElementById("Mediana");
 var pequenaselect = document.getElementById("Pequeña");

var radiopizza=false;
var totalcuenta=0;




if (bacon){
    bacon.onclick= function(){
     console.log("TEXTO PRUEBA");
                    if (bacon.checked){
                        totalcuenta += 1;
                        console.log(totalcuenta);
                    }
                    else{
                        totalcuenta -= 1;
                        console.log(totalcuenta);
                    }
    }
    
}
if (queso){
    queso.onclick= function(){
                    if (queso.checked){
                        totalcuenta += 1;
                        console.log(totalcuenta);
                    }
                    else{
                        totalcuenta -= 1;
                        console.log(totalcuenta);
                    }
    }
    
}
if (tomate){
    tomate.onclick= function(){
                    if (tomate.checked){
                        totalcuenta += 1;
                        console.log(totalcuenta);
                    }
                    else{
                        totalcuenta -= 1;
                        console.log(totalcuenta);
                    }
    }
    
}
if (oregano){
    oregano.onclick= function(){
                    if (oregano.checked){
                        totalcuenta += 1;
                        console.log(totalcuenta);
                    }
                    else{
                        totalcuenta -= 1;
                        console.log(totalcuenta);
                    }
    }
   
}
var precioanterior=0;
if (pequenaselect){
    pequenaselect.onclick= function(){
                    if (pequenaselect.checked){
                        totalcuenta = totalcuenta - precioanterior + 5;
                        console.log(totalcuenta);
                        precioanterior=5;
                        radiopizza=true;
                    }
                    
    }
        
        
}
if (medianaselect){
    medianaselect.onclick= function(){
                    if (medianaselect.checked){
                        totalcuenta = totalcuenta - precioanterior + 10;
                        console.log(totalcuenta);
                        precioanterior=10;
                        radiopizza=true;
                    }
                    
    }
        
        
}
if (grandeselect){
    grandeselect.onclick= function(){
                    if (grandeselect.checked){
                        totalcuenta = totalcuenta - precioanterior + 15;
                        console.log(totalcuenta);
                        precioanterior=15;
                        radiopizza=true;
                    }
                    
    }
        
        
}


//    total.onclick = calcularcuenta();

*/
if (document.getElementById("Tomate").checked)
      {
        console.log("INGREDIENTE SELECCIONADO");
      }


};






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
            pizza.setAttribute("id", "arraypizzas[i].nombre")
            pizza.setAttribute("value", "arraypizzas[i].precio");

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
          ingredientes.setAttribute("name", "ingredientes");
          ingredientes.setAttribute("type", "checkbox");
          ingredientes.setAttribute("id", "ingredient[i].nombre");

          dinamico.appendChild(ingredientes);
        }    

      }

      
/*
   function calcularcuenta(){
                      

      if(!radiopizza){
          alert("Selecciona un tamaño de pizza"); 
      }
      pregunta = document.getElementsByName("ingredientes");
      var seleccionado = false;
      for(var i=0; i<pregunta.length; i++) {
          if(pregunta[i].checked) {
              seleccionado = true;
              break;//en cuanto alguna pregunta este seleccionada
                  //paramos la ejecución
          }
      }

      if(!seleccionado) {
          alert('[ERROR] Debe seleccionar almenos un ingrediente');
          return false;
          
      }
      alert('TOTAL PEDIDO ES ' + totalcuenta);
      
      return false;
  }
*/
  



