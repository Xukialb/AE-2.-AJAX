const URL_DESTINO = "http://localhost:5500/AE-2.-AJAX"
const RECURSO = "tamanios.json"

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

    function procesarRespuesta(jsonDoc) {
        //Convertimos un texto a un objeto JSON
        var objetoJson = JSON.parse(jsonDoc)
        //Podemos hacer lo contrario con "JSON.stringify(obj)"
        console.log(objetoJson)

        //Lo suyo seria crear objetos con el DOM, esto esta regulín
        //pero como ejemplo sencillo vale
        var table = "<tr><th>Title</th><th>Artist</th></tr>";
        var arrayCDs = objetoJson.CATALOG.CD;//Ojo mayusculas y minusculas, es como este en el json original
        
        //Iteramos el array de CDs y formamos las filas y columnas
        for(let cd of arrayCDs){
            table += "<tr><td>" + cd.TITLE + "</td>" + 
                "<td>" + cd.ARTIST + "</td></tr>";
        }

        resultadoBusqueda.innerHTML = table;

        /*Tambien podemos hacerlo así, con un for clasico
        for (let i = 0; i < arrayCDs.length; i++) {
            table += "<tr><td>" + arrayCDs[i].TITLE + "</td>" + 
                "<td>" + arrayCDs[i].ARTIST + "</td></tr>";
        }
        resultadoBusqueda.innerHTML = table;
        */
    }
