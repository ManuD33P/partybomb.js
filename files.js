var Words = {}
var silabas;
//abrir archivo diccionario, para almacenar el cache.
function openFile(){
    for (var letra = 'a'; letra <= 'z'; letra = String.fromCharCode(letra.charCodeAt(0) + 1)){  
        Words[letra] = File.load(letra+".txt").split("\n");
    }
    silabas = File.load("silabas.txt").split("\n");
    silabas = silabas.filter( function(element){ if(element){ return element}});
 return true;
}

